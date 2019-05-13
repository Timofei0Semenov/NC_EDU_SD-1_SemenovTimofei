import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../modules/message/model/message';
import {Notification} from '../modules/notification/model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>('/api/notifications/all');
  }

  deleteNotification(idNotification: string) {
    return this.http.delete('/api/notifications/' + idNotification);
  }

  saveNotification(notification: Notification) {
    return this.http.post('/api/notifications', notification);
  }

  getById(idNotification: string): Observable<Notification> {
    return this.http.get<Notification>('/api/notifications/id/' + idNotification);
  }

  getByOwner(login: string): Observable<Notification[]> {
    return this.http.get<Notification[]>('/api/notifications/byOwner/' + login);
  }
}
