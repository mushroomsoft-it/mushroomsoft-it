import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoFooterComponent } from './info-footer.component';

describe('InfoFooterComponent', () => {
  let component: InfoFooterComponent;
  let fixture: ComponentFixture<InfoFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoFooterComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoFooterComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
