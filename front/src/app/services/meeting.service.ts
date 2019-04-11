import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Meeting} from '../modules/meeting/models/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) {
  }

  getAllMeetings(): Observable<Meeting[]> {
    /* this.meetingService.getAllMeetings().subscribe(data => {
      this.events = data.map(item => {
        return new Meeting(item.id, item.title, item.start, item.end, item.room, item.owner, item.members);
      });
    });*/
    return this.http.get<Meeting[]>('/api//meetings/all');
  }

  deleteMeeting(meetingId: number): Observable<void> {
    return this.http.delete<void>('/api//meetings/' + meetingId);
  }

  saveMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>('/api/meetings', meeting);
  }

  getMeetingById(id: number): Observable<Meeting> {
    return this.http.get<Meeting>('/api/meetings/id/' + id);
  }
}
