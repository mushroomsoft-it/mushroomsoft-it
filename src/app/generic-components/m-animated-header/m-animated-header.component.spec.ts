import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAnimatedHeaderComponent } from './m-animated-header.component';

describe('MAnimatedHeaderComponent', () => {
  let component: MAnimatedHeaderComponent;
  let fixture: ComponentFixture<MAnimatedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MAnimatedHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MAnimatedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
