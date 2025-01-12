import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LanguageEnum, NavigationEnum } from '../types/appSections';

const OVERFLOW_CSS_CLASS = 'm-overflow-hidden';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private subMenuIdSubject: BehaviorSubject<string | undefined> =
    new BehaviorSubject<string | undefined>(undefined);
  public subMenuIdObservable: Observable<string | undefined> =
    this.subMenuIdSubject.asObservable();

  private modalSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public modalObservable: Observable<boolean> =
    this.modalSubject.asObservable();

  private cookiesSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public cookiesObservable: Observable<boolean> =
    this.cookiesSubject.asObservable();

  private languageSubject: BehaviorSubject<LanguageEnum | undefined> =
    new BehaviorSubject<LanguageEnum | undefined>(undefined);
  public languageObservable: Observable<LanguageEnum | undefined> =
    this.languageSubject.asObservable();

  public chooseAppLanguage(language: LanguageEnum) {
    this.languageSubject.next(language);
    localStorage.setItem(NavigationEnum.SelectedLanguage, language);
  }

  public emitSubMenuId(subMenuId: string | undefined) {
    this.subMenuIdSubject.next(subMenuId);
  }

  public showHideCookiesBanner(showHide: boolean) {
    this.showHideBodyScrollBar(showHide);
    this.cookiesSubject.next(showHide);
  }

  public showHideModal(showHide: boolean) {
    this.showHideBodyScrollBar(showHide);
    this.modalSubject.next(showHide);
  }

  private showHideBodyScrollBar(showHide: boolean) {
    const bodyClassList = document.querySelector('body')!.classList;
    if (showHide) {
      bodyClassList?.add(OVERFLOW_CSS_CLASS);
    } else {
      bodyClassList?.remove(OVERFLOW_CSS_CLASS);
    }
  }
}
