import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhoTrustUsComponent } from './who-trust-us.component';

describe('WhoTrustUsComponent', () => {
  let component: WhoTrustUsComponent;
  let fixture: ComponentFixture<WhoTrustUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoTrustUsComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WhoTrustUsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
