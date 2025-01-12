import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MContactLinksComponent } from './m-contact-links.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MContactLinksComponent', () => {
  let component: MContactLinksComponent;
  let fixture: ComponentFixture<MContactLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MContactLinksComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MContactLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
