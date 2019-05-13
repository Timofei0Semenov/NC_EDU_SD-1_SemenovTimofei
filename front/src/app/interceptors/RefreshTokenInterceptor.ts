import {BehaviorSubject, EMPTY, Observable, throwError} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(public auth: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('oauth/')) {
      return next.handle(request);
    }
    if (request.url.includes('api/')) {
      return next.handle(request).catch(error => {
        if (error.status == 401) {
          if (JSON.parse(window.localStorage.getItem('rememberMe')) != null) {
            if (this.refreshTokenInProgress) {
              return this.refreshTokenSubject
                .filter(result => result !== null)
                .take(1)
                .switchMap(() => next.handle(this.addAuthenticationToken(request)));
            } else {
              this.refreshTokenInProgress = true;
              this.refreshTokenSubject.next(null);

              return this.auth
                .refreshToken()
                .switchMap((token: any) => {
                  window.localStorage.setItem('token', JSON.stringify(token));
                  this.refreshTokenInProgress = false;
                  this.refreshTokenSubject.next(token);

                  return next.handle(this.addAuthenticationToken(request));
                })
                .catch((err: any) => {
                  this.refreshTokenInProgress = false;
                  return throwError(err);
                });
            }
          } else {
            alert('Session over');
            this.auth.logout();
            this.router.navigateByUrl('/login');
            return EMPTY;
          }
        } else {
          return throwError(error);
        }
      });
    }
  }

  addAuthenticationToken(request) {
    const accessToken = JSON.parse(window.localStorage.getItem('token')).access_token;
    if (!accessToken) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token')).access_token}`
      }
    });
  }
}
