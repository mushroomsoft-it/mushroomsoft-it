import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { navigationGuard } from './navigation.guard';
import { SectionEnum } from './types/appSections';
import { BrochureComponent } from './components/brochure/brochure.component';

export const routes: Routes = [
  {
    path: SectionEnum.Home,
    component: AppComponent,
    canActivate: [navigationGuard],
  },
  {
    path: SectionEnum.WhatWeDo,
    component: AppComponent,
    canActivate: [navigationGuard],
  },
  {
    path: `${SectionEnum.Services}/:service`,
    component: AppComponent,
    canActivate: [navigationGuard],
  },
  {
    path: SectionEnum.WhoWeAre,
    component: AppComponent,
    canActivate: [navigationGuard],
  },
  {
    path: SectionEnum.OurStory,
    component: AppComponent,
    canActivate: [navigationGuard],
  },
  {
    path: SectionEnum.OurTeam,
    component: AppComponent,
    canActivate: [navigationGuard],
  },
  {
    path: SectionEnum.Location,
    component: AppComponent,
    canActivate: [navigationGuard],
  },
  {
    path: SectionEnum.Brochure,
    component: BrochureComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
