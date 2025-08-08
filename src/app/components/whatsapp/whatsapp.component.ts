import { Component, Input } from '@angular/core';
import { LanguageEnum, Section, SectionEnum } from '../../types/appSections';
import { NavigationService } from '../../observables/navigation.service';
import { MIconComponent } from '../../generic-components/m-icon/m-icon.component';

@Component({
  selector: 'app-whatsapp',
  standalone: true,
  imports: [
    MIconComponent
  ],
  templateUrl: './whatsapp.component.html',
  styleUrl: './whatsapp.component.scss'
})
export class WhatsappComponent {
  @Input() navOptions!: Section[];
  public pickedLanguage: LanguageEnum | undefined;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService.languageObservable.subscribe((language) => {
      if (language) {
        this.pickedLanguage = undefined;
        setTimeout(() => {
          this.pickedLanguage = language;
        }, 100);
      }
    });
  }

  public selectLanguage(event: Event, language: string) {
    event.preventDefault();
    this.navigationService.chooseAppLanguage(language as LanguageEnum);
  }

  public get languagesList(): string[] {
    const array = (Object.values(LanguageEnum) as string[]).filter(
      (l) => l != this.pickedLanguage
    );
    return array;
  }

  public get whatsAppLink() {
    return this.navOptions?.find((n) => n.id === SectionEnum.WhatsAppNavLink);
  }
}
