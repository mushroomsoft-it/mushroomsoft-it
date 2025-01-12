import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TIMEOUT_MESSAGE } from './constants/email.constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({ timeOut: TIMEOUT_MESSAGE, preventDuplicates: true,
        iconClasses: {
          success: 'none',  
          error: 'none',    
          info: 'none',     
          warning: 'none'   
        },
        toastClass: 'custom-toast' 
     }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([BrowserAnimationsModule]),
    importProvidersFrom([CarouselModule]),
  ],
};
