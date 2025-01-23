import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { OurTeamComponent } from './our-team.component';
import { MemberService } from '../../services/member.service';
import { NavigationService } from '../../observables/navigation.service';
import { of, Subject, throwError } from 'rxjs';
import { Section } from '../../types/appSections';
class MockMemberService {
  getMembers() {
    return of([
      { id: 1, name: 'John Doe', foto: 101 },
      { id: 2, name: 'Jane Smith', foto: 102 },
      { id: 3, name: 'No Photo Member' },
    ]);
  }
  getImage(foto: number) {
    const imageUrls: { [key: number]: string } = {
      101: 'https://example.com/image101.jpg',
      102: 'https://example.com/image102.jpg',
    };
    return imageUrls[foto]
      ? of(imageUrls[foto])
      : throwError(() => new Error('Image not found'));
  }
}

class MockNavigationService {
  languageObservable = new Subject<string>();
}
describe('OurTeamComponent', () => {
  let component: OurTeamComponent;
  let fixture: ComponentFixture<OurTeamComponent>;
  let mockMemberService: MockMemberService;
  let mockNavigationService: MockNavigationService;
  let navigationService: jasmine.SpyObj<NavigationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurTeamComponent, HttpClientTestingModule],
      providers: [
        { provide: MemberService, useClass: MockMemberService },
        { provide: NavigationService, useClass: MockNavigationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OurTeamComponent);
    component = fixture.componentInstance;
    mockNavigationService = TestBed.inject(
      NavigationService
    ) as unknown as MockNavigationService;
    component.ourTeamData = {
      id: 'team-section',
      title: 'team-section',
      catalog: [],
    } as Section;

    navigationService = TestBed.inject(
      NavigationService
    ) as jasmine.SpyObj<NavigationService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch members and set catalog on initialization', async () => {
    await component.ngOnInit();
    expect(component.membersList.length).toBe(3);
    expect(component.membersList[0].image).toBe(
      'https://example.com/image101.jpg'
    );
    expect(component.membersList[1].image).toBe(
      'https://example.com/image102.jpg'
    );
    expect(component.membersList[2].image).toBeUndefined();
    expect(component.ourTeamData.catalog).toEqual(component.membersList);
  });

  it('should animate all items in the catalog with delay', fakeAsync(() => {
    const setTimeoutSpy = spyOn(window, 'setTimeout').and.callThrough();

    component.animateList();
    component.ourTeamData.catalog!.forEach((item) => {
      expect(item.animate).toBeUndefined();
    });
    let currentTimeout = 0;
    component.ourTeamData.catalog!.forEach((item) => {
      currentTimeout += 350;
      tick(currentTimeout);
      expect(item.animate).toBeTrue();
    });

    expect(setTimeoutSpy).toHaveBeenCalledTimes(
      component.ourTeamData.catalog!.length
    );
    expect(component.animationDone).toBeTrue();
  }));

  it('should not animate if animationDone is true', () => {
    component.animationDone = true;
    component.animateList();
    expect(
      component.ourTeamData.catalog!.every((item) => item.animate === false)
    ).toBeTrue();
  });

  it('should call registerScrollEvent', async () => {
    const registerScrollEventSpy = spyOn(component, 'registerScrollEvent');
    await component.ngOnInit();
    expect(registerScrollEventSpy).toHaveBeenCalled();
  });

  it('should subscribe to languageObservable and update animation state', async () => {
    const languageObservableSpy = jasmine.createSpyObj('languageObservable', [
      'subscribe',
    ]);
    navigationService.languageObservable = languageObservableSpy;
    await component.ngOnInit();
    expect(languageObservableSpy.subscribe).toHaveBeenCalled();
  });
});
