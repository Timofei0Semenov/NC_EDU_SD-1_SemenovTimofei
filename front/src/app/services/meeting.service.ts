import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Meeting} from '../modules/meeting/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) {
  }

  getAllMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>('/api//meeting/all');
  }

  deleteMeeting(meetingId: number): Observable<void> {
    return this.http.delete<void>('/api//meeting/' + meetingId);
  }

  saveMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>('/api/meeting', meeting);
  }

  getMeetingById(id: number): Observable<Meeting> {
    return this.http.get<Meeting>('/api/meeting/id/' + id);
  }
}
