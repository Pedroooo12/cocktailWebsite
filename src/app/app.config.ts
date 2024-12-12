import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true
      }),
     ),
     importProvidersFrom(NgxSpinnerModule.forRoot(/*config*/)),
      provideAnimations(),
     provideHttpClient()
  ],
};
