import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserComponent} from '../modules/user/user.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }


  getAllUsers(): Observable<UserComponent[]> {
    return this.http.get<UserComponent[]>('/api/user/all');
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>('/api/user/' + userId);
  }

  saveUser(user: UserComponent): Observable<UserComponent> {
    return this.http.post<UserComponent>('/api/user', user);
  }

  getUserById(id: string): Observable<UserComponent> {
    return this.http.get<UserComponent>('/api/user/id/' + id);
  }

}
