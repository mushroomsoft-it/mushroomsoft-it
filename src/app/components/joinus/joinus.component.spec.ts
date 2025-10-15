import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinusComponent } from './joinus.component';

describe('JoinusComponent', () => {
  let component: JoinusComponent;
  let fixture: ComponentFixture<JoinusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
