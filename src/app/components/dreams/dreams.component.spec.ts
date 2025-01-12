import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DreamsComponent } from './dreams.component';

describe('DreamsComponent', () => {
  let component: DreamsComponent;
  let fixture: ComponentFixture<DreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DreamsComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DreamsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
