import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RoomComponent} from '../modules/room/room.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {
  }


  getAllRooms(): Observable<RoomComponent[]> {
    return this.http.get<RoomComponent[]>('/api/room/all');
  }

  deleteRoom(roomId: number): Observable<void> {
    return this.http.delete<void>('/api/room/' + roomId);
  }

  saveRoom(room: RoomComponent): Observable<RoomComponent> {
    return this.http.post<RoomComponent>('/api/room', room);
  }

  getRoomById(id: number): Observable<RoomComponent> {
    return this.http.get<RoomComponent>('api/room/id/' + id);
  }

}
