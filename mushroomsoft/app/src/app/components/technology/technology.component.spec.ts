import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {MainLibService} from '@mushroomsoft-lib';
import {TechnologyComponent} from './technology.component';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TechnologyComponent', () => {
  let component: TechnologyComponent;
  let fixture: ComponentFixture<TechnologyComponent>;
  let service: MainLibService;
  let httpClient: HttpClient;
  let injector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechnologyComponent],
      providers: [MainLibService],
      imports: [HttpClientTestingModule]
    }).compileComponents();
    service = TestBed.inject(MainLibService);
    injector = getTestBed();
    httpClient = injector.get(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
