import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsumerService } from './consumer/consumer.service';
import {catchError, finalize, Observable, retry, throwError } from 'rxjs';

@Injectable()

export class loadingInterceptor implements HttpInterceptor{

  private totalRequests = 0;

  constructor(private consumService: ConsumerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('caught')
    this.totalRequests++;
    this.consumService.setLoading(true);
    return next.handle(request).pipe(

      // finalize(() => {
      //   this.totalRequests--;
      //   if (this.totalRequests == 0) {
      //     this.consumService.setLoading(false);
      //   }
      // })
      retry(30), // Réessaie jusqu'à 3 fois
      catchError((error) => {
        console.error('Retry failed:', error);
        return throwError(() => error);
      }),
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.consumService.setLoading(false);
        }
      })
    );
  }
};
