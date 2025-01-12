import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookiesBannerComponent } from './cookies-banner.component';

describe('CookiesBannerComponent', () => {
  let component: CookiesBannerComponent;
  let fixture: ComponentFixture<CookiesBannerComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        CookiesBannerComponent,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CookiesBannerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
