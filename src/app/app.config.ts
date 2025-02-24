import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    // Add your providers here...
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling( { scrollPositionRestoration: 'top'})),
    provideClientHydration(withEventReplay()),
    
    // Add more providers here...
    provideHttpClient(withInterceptors([headersInterceptor,errorsInterceptor,loadingInterceptor]) ,withFetch()),
    provideAnimations(),
  ],
};
