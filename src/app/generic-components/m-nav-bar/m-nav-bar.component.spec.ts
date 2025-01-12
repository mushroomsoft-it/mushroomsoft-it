import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MNavBarComponent } from './m-nav-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MNavBarComponent', () => {
  let component: MNavBarComponent;
  let fixture: ComponentFixture<MNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MNavBarComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
