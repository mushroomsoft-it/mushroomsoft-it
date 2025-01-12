import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhoWeAreComponent } from './who-we-are.component';

describe('WhoWeAreComponent', () => {
  let component: WhoWeAreComponent;
  let fixture: ComponentFixture<WhoWeAreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoWeAreComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WhoWeAreComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
