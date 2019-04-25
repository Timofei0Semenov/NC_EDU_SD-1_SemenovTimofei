import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../modules/user/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }


  getAllUsers(): Observable<User[]> {
    /*this.userService.getAllUsers().subscribe(data => {
      this.users = data.map(item => {
        return new User(item.id, item.firstName, item.lastName, item.login, item.role);
      });
    });*/
    return this.http.get<User[]>('/api/users/all');
  }

  deleteUser(userId: string) {
    return this.http.delete<void>('/api/users/' + userId);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('/api/users/', user);
  }

  getUserById(id: number): Observable<User> {
    /*this.userService.getUserById(1).subscribe((data: User) =>
      this.user = new User(data.id, data.firstName, data.lastName, data.login, data.role, data.meetings, data.meetingsCreatedMe));*/
    return this.http.get<User>('/api/users/id/' + id);
  }

  getUserByLogin(login: string): Observable<User> {
    return this.http.get<User>('/api/users/login/' + login);
  }

  getUsersByMeeting(idMeeting: string): Observable<User[]> {
    return this.http.get<User[]>('/api/users/byMeeting/' + idMeeting);
  }

  updateUser(user: User) {
    return this.http.put('/api/users', user);
  }

  getUsersByFriend(idUser: string): Observable<User[]> {
    return this.http.get<User[]>('/api/users/byFriend/' + idUser);
  }

  addFriend(user: User, loginFriend: string) {
    return this.http.post('api/users/addFriend/' + loginFriend, user);
  }

  getNewFriends(idUser: string): Observable<User[]> {
    return this.http.get<User[]>('/api/users/newFriends/' + idUser);
  }
}
