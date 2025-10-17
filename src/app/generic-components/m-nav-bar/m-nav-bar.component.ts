import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MIconComponent } from '../m-icon/m-icon.component';
import { RouterModule } from '@angular/router';
import { LanguageEnum, Section, SectionEnum } from '../../types/appSections';
import sections from '../../config/sections.json';
import { NavigationService } from '../../observables/navigation.service';
import { JOINUS_EXTERNAL_URL } from '../../constants/joinus.constants';

@Component({
  selector: 'm-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, MIconComponent],
  templateUrl: './m-nav-bar.component.html',
  styleUrl: './m-nav-bar.component.scss',
})
export class MNavBarComponent implements OnInit {
  @Input() navOptions!: Section[];
  public isMenuDisplayed!: boolean;
  public pickedLanguage: LanguageEnum | undefined;
  public languageEnums = LanguageEnum;
  public languageMenuFocused = false;

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

  public get getInTouchLink() {
    return this.navOptions?.find((n) => n.id == SectionEnum.GetInTouchNavLink);
  }

  public get getJoinUsLink() {
    return this.navOptions?.find((n) => n.id == SectionEnum.JoinUsLink);
  }

  public openModal() {
    this.navigationService.showHideModal(true);
  }

  public openJoinUs() {
    window.open(JOINUS_EXTERNAL_URL, '_blank');
  }
}
