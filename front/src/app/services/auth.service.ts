import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../modules/user/models/user';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  user: User;
  errorMessage = '';

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {
  }

  getToken(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('frontend-client:frontend-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post('http://localhost:8081/oauth/token', loginPayload, {headers});
  }

  refreshToken() {
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', JSON.parse(window.localStorage.getItem('token')).refresh_token);
    const headers = {
      'Authorization': 'Basic ' + btoa('frontend-client:frontend-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post('http://localhost:8081/oauth/token', body.toString(), {headers});
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
  }

  isAuthorized() {
    return JSON.parse(window.localStorage.getItem('currentUser')) != null;
  }

  login(username: string, password: string, rememberMe: boolean) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
    this.errorMessage = '';

    this.getToken(body.toString()).subscribe(data => {
      window.localStorage.setItem('token', JSON.stringify(data));
      this.userService.getUserByLogin(username)
        .subscribe((data2: User) => {
          this.user =
            new User(data2.idUser, data2.firstName, data2.lastName, data2.login, data2.role, data2.email, data2.password);
          window.localStorage.setItem('currentUser', JSON.stringify(this.user));
          if (this.isAuthorized()) {
            if (rememberMe) {
              window.localStorage.setItem('rememberMe', JSON.stringify(true));
            }
            this.router.navigateByUrl('/home');
          }
        });
    }, error1 => {
      if (error1.status == '401') {
        this.errorMessage = 'User with such login not found';
      } else if (error1.status == '400') {
        this.errorMessage = 'Uncorrect password!';
      }
    });
  }
}
