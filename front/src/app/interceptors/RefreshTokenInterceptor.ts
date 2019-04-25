import {EMPTY, Observable, throwError} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/catch';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, private router: Router) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).catch(error => {
      if (error.status == 401) {
        alert('Session over');
        this.auth.logout();
        this.router.navigateByUrl('/login');
        return EMPTY;
      } else {
        return throwError(error);
      }
    });
  }
}
