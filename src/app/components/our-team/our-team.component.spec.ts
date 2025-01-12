import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OurTeamComponent } from './our-team.component';

describe('OurTeamComponent', () => {
  let component: OurTeamComponent;
  let fixture: ComponentFixture<OurTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurTeamComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OurTeamComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
