import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorsService implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.getCurrentUserValue();

    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: currentUser.token
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }
}
