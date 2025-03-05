import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MContactLinksComponent } from '../../generic-components/m-contact-links/m-contact-links.component';
import { NotificationService } from '../../services/notification.service';
import { FieldType, LanguageEnum, Section } from '../../types/appSections';
import { NavigationService } from '../../observables/navigation.service';

@Component({
  selector: 'get-in-touch',
  standalone: true,
  imports: [CommonModule, MContactLinksComponent, ReactiveFormsModule],
  templateUrl: './get-in-touch.component.html',
  styleUrl: './get-in-touch.component.scss',
})
export class GetInTouchComponent {
  @Input() sectionData!: Section;
  @Output() formSubmitted = new EventEmitter<void>();
  public fieldTypes = FieldType;
  public emailApiUrl: string = '';
  public accessKey: string = '';
  public subject: string = '';
  contactForm!: FormGroup;

  private languageUsed! : LanguageEnum | undefined;

  constructor(
    private notificationService: NotificationService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private navigationService:NavigationService
  ) {
    this.accessKey = this.notificationService.getAccessKey();
  }

  ngOnInit(): void {
    this.subject = this.sectionData.email?.subject ?? '';
    const formGroupConfig: Record<string, any> = {
      subject: [this.subject],
      access_key: [this.accessKey],
    };

    if (this.sectionData && this.sectionData.formFields) {
      this.sectionData.formFields.forEach((field) => {
        const validators = [];
        if (field.required) {
          validators.push(Validators.required);
        }
        if (field.id === 'email') {
          validators.push(Validators.email);
        }
        if (field.id === 'name') {
          validators.push(Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/));
        }
        formGroupConfig[field.id] = ['', validators];
      });
    }
    this.contactForm = this.fb.group({...formGroupConfig, honeypot: [''], language: [LanguageEnum.En]});
  }

  onSubmit(): void {
    if (this.contactForm.valid) {

      this.navigationService.languageObservable.subscribe(
        (language) => {
          this.languageUsed = language;
        }
      );

      const formData = {...this.contactForm.value, language: this.languageUsed || LanguageEnum.En};

      this.notificationService.sendToMsTeams(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.toastrService.success(this.sectionData.email?.success_message);
        },
        error: (error) => {
          this.toastrService.error(this.sectionData.email?.error_message);
        }
      })

      this.formSubmitted.emit();
    } else {
      this.toastrService.error(this.sectionData.email?.warning_message);
    }
  }
}
