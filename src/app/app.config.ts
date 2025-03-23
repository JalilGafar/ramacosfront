import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { httpInterceptorProviders, HttpRequestInterceptor } from './_helpers/http.interceptor';
import { loadingInterceptor } from './loading.interceptor';

export const appConfig: ApplicationConfig = {
  
    providers: [

  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: HttpRequestInterceptor,
  //     multi: true,
  //   },
  provideHttpClient(withInterceptorsFromDi(),),
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },  
  { provide: HTTP_INTERCEPTORS, useClass: loadingInterceptor, multi: true  },
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // httpInterceptorProviders
  ]
};
