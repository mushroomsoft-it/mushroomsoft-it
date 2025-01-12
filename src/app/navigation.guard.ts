import { Location, ViewportScroller } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LanguageEnum, NavigationEnum, SectionEnum } from './types/appSections';
import { NavigationService } from './observables/navigation.service';

export const navigationGuard: CanActivateFn = (route, state) => {
  const location: Location = inject(Location);
  const scroller: ViewportScroller = inject(ViewportScroller);
  const navService: NavigationService = inject(NavigationService);

  const urlList = (
    state.url.includes('?')
      ? state.url.substring(0, state.url.indexOf('?'))
      : state.url
  ).split('/');
  const mainRoute = urlList[1];
  const subRoute = urlList[2];

  const selectedLanguage =
    localStorage.getItem(NavigationEnum.SelectedLanguage) ?? LanguageEnum.En;

  if (Object.values(SectionEnum).includes(mainRoute as SectionEnum)) {
    setTimeout(() => {
      location.replaceState(`/${mainRoute}${subRoute ? '/' + subRoute : ''}`);
    });
    navService.chooseAppLanguage(selectedLanguage as LanguageEnum);

    if (mainRoute != SectionEnum.Home) {
      setTimeout(() => {
        scroller.scrollToAnchor(mainRoute);
      }, 300);
    }
    if (subRoute) {
      setTimeout(() => {
        navService.emitSubMenuId(subRoute.split('=').pop()!);
      }, 1000);
    }
  }

  return false;
};
