import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MModalComponent } from './m-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MModalComponent', () => {
  let component: MModalComponent;
  let fixture: ComponentFixture<MModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MModalComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
