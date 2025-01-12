import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatWeDoComponent } from './what-we-do.component';

describe('WhatWeDoComponent', () => {
  let component: WhatWeDoComponent;
  let fixture: ComponentFixture<WhatWeDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatWeDoComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WhatWeDoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
