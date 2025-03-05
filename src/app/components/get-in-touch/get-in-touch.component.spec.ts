import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { FieldType, Section } from '../../types/appSections';
import { GetInTouchComponent } from './get-in-touch.component';

describe('GetInTouchComponent', () => {
  let component: GetInTouchComponent;
  let fixture: ComponentFixture<GetInTouchComponent>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', [
      'getAccessKey',
      'sendToMsTeams',
    ]);

    notificationServiceSpy.getAccessKey.and.returnValue('mock-access-key');
    notificationServiceSpy.sendToMsTeams.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, GetInTouchComponent],
      providers: [
        FormBuilder,
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GetInTouchComponent);
    component = fixture.componentInstance;
    component.contactForm = (component as any).fb.group({
      name: ['', []],
      email: ['', []],
      subject: ['', []],
      access_key: [(component as any).notificationService.getAccessKey(), []],
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the correct fields', () => {
    component.sectionData = {
      id: 'test-section',
      title: 'Contact Us',
      formFields: [
        { id: 'name', name: 'Name', required: true, type: FieldType.InputText },
        {
          id: 'email',
          name: 'Email',
          required: true,
          type: FieldType.InputText,
        },
      ],
    } as Section;
    component.ngOnInit();
    expect(component.contactForm.controls['name']).toBeDefined();
    expect(component.contactForm.controls['email']).toBeDefined();
    expect(component.contactForm.controls['subject']).toBeDefined();
    expect(component.contactForm.controls['access_key']).toBeDefined();
  });

  it('should handle the error response from the API call', () => {
    const formData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: component.subject,
      access_key: component.accessKey,
      language: 'en',
    };
    component.sectionData = {
      email: {
        error_message: 'There was a problem sending the form',
      },
    } as Section;
    notificationServiceSpy.sendToMsTeams.and.returnValue(
      throwError(() => new Error('API error'))
    );

    component.contactForm.setValue(formData);
    component.onSubmit();

    expect(toastrSpy.error).toHaveBeenCalledWith(
      component.sectionData.email?.error_message
    );
  });

  it('should submit the form when valid', () => {
    const formData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: component.subject,
      access_key: component.accessKey,
      language: 'en',
    };

    component.sectionData = {
      email: {
        success_message: 'Form sent successfully',
      },
    } as Section;

    component.contactForm.setValue(formData);
    component.onSubmit();

    expect(notificationServiceSpy.sendToMsTeams).toHaveBeenCalledWith(formData);
    expect(toastrSpy.success).toHaveBeenCalledWith(
      component.sectionData.email?.success_message
    );
  });
});
