import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../modules/message/model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private  http: HttpClient) {
  }

  getAll(): Observable<Message[]> {
    return this.http.get<Message[]>('/api/messages/all');
  }

  deleteMessage(idMessage: string) {
    return this.http.delete('/api/messages/' + idMessage);
  }

  saveMessage(message: Message) {
    return this.http.post('/api/messages', message);
  }

  getById(idMessage: string): Observable<Message> {
    return this.http.get<Message>('/api/messages/' + idMessage);
  }

  getByReceiver(login: string): Observable<Message[]> {
    return this.http.get<Message[]>('/api/messages/' + login);
  }
}
