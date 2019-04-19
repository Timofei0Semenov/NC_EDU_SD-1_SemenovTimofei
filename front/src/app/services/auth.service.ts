import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../modules/user/models/user';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private userSource: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.userSource = new BehaviorSubject<User>(null);
    this.currentUser = this.userSource.asObservable();
  }

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('frontend-client:frontend-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post('http://localhost:8081/oauth/token', loginPayload, {headers});
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
    this.userSource.next(null);
  }

  changeCurrentUser(user: User) {
    this.userSource.next(user);
  }
}
