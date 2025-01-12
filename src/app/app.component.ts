import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MIconComponent } from './generic-components/m-icon/m-icon.component';
import { MNavBarComponent } from './generic-components/m-nav-bar/m-nav-bar.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { WhatWeDoComponent } from './components/what-we-do/what-we-do.component';
import { WhoTrustUsComponent } from './components/who-trust-us/who-trust-us.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { MServicesComponent } from './components/m-services/m-services.component';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { MFooterComponent } from './components/m-footer/m-footer.component';
import sections from './config/sections.json';
import { Section, SectionEnum } from './types/appSections';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { DreamsComponent } from './components/dreams/dreams.component';
import { MModalComponent } from './generic-components/m-modal/m-modal.component';
import { GetInTouchComponent } from './components/get-in-touch/get-in-touch.component';
import { NavigationService } from './observables/navigation.service';
import { InfoFooterComponent } from './components/info-footer/info-footer.component';
import { CookiesBannerComponent } from './components/cookies-banner/cookies-banner.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    CarouselModule,
    MIconComponent,
    MNavBarComponent,
    MainSectionComponent,
    WhatWeDoComponent,
    WhoTrustUsComponent,
    StatisticsComponent,
    MServicesComponent,
    WhoWeAreComponent,
    OurTeamComponent,
    MFooterComponent,
    DreamsComponent,
    MModalComponent,
    GetInTouchComponent,
    InfoFooterComponent,
    CookiesBannerComponent,
  ],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public sectionEnum = SectionEnum;
  public appSections!: Section[];
  public showModal = false;
  public showCookiesBanner = false;
  private subscription: Subscription = new Subscription();

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.navigationService.languageObservable.subscribe((language) => {
        if (language) {
          this.appSections = sections.textData.find(
            (d) => d.language == language
          )!.data;
        }
      })
    );

    this.subscription.add(
      this.navigationService.modalObservable.subscribe((showHide: boolean) => {
        this.showModal = showHide;
      })
    );

    this.subscription.add(
      this.navigationService.cookiesObservable.subscribe(
        (showHide: boolean) => {
          this.showCookiesBanner = showHide;
        }
      )
    );
  }
  closeContactFormModal(): void {
    this.showModal = false;
  }
}
