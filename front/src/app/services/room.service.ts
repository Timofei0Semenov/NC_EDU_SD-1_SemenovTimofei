import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Room} from '../modules/room/models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {
  }


  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>('/api/rooms/all');
  }

  deleteRoom(roomId: number) {
    return this.http.delete<void>('/api/rooms/' + roomId);
  }

  saveRoom(room: Room): Observable<Room> {
    return this.http.post<Room>('/api/rooms', room);
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>('api/rooms/id/' + id);
  }

}
