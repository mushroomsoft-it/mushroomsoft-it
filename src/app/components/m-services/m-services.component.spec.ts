import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MServicesComponent } from './m-services.component';

describe('MServicesComponent', () => {
  let component: MServicesComponent;
  let fixture: ComponentFixture<MServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MServicesComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MServicesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
