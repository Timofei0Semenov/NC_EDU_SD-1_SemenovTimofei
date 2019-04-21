import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class ApplyTokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes('api/') || req.url == '/api/users/') {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
       Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token')).access_token}`
      }
    });
    return next.handle(authReq);
  }
}
