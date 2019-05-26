import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Meeting} from '../modules/meeting/models/meeting';
import {User} from '../modules/user/models/user';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  meetingsDateSource: BehaviorSubject<Meeting[]> = new BehaviorSubject([]);
  meetingsData = this.meetingsDateSource.asObservable();

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

  deleteMeeting(meetingId: string) {
    return this.http.delete<void>('/api//meetings/' + meetingId);
  }

  saveMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>('/api/meetings', meeting);
  }

  getMeetingById(id: number): Observable<Meeting> {
    return this.http.get<Meeting>('/api/meetings/id/' + id);
  }

  getByMember(login: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>('/api/meetings/byMember/' + login);
  }

  getByPotentialMember(login: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>('/api/meetings/byPotentialMember/' + login);
  }

  getByOwner(login: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>('/api/meetings/byOwner/' + login);
  }

  addMember(user: User, idMeeting: string) {
    return this.http.post('api/meetings/addMember/' + idMeeting, user);
  }

  addPotentialMember(user: User, idMeeting: string) {
    return this.http.post('api/meetings/addPotentialMember/' + idMeeting, user);
  }

  addNoMember(user: User, idMeeting: string) {
    return this.http.post('api/meetings/addNoMember/' + idMeeting, user);
  }

  updateMeeting(meeting: Meeting, idMeeting: string) {
    return this.http.put('api/meetings/updateMeeting/' + idMeeting, meeting);
  }

  addOneToMeetings(newMeeting: Meeting) {
    const currentData = this.meetingsDateSource.value;
    const updateData = [...currentData, newMeeting];
    this.meetingsDateSource.next(updateData);
  }

  deleteOneFromMeetings(deleteMeeting: Meeting) {
    const currentData = this.meetingsDateSource.value;
    currentData.splice(currentData.indexOf(deleteMeeting), 1);
    this.meetingsDateSource.next(currentData);
  }

  initMeetings(user: User) {
    this.meetingsDateSource.next([]);
    this.getByMember(user.login).subscribe(data => {
      this.meetingsDateSource.next(this.meetingsDateSource.value.concat(data.map(item => {
        return new Meeting(item.idMeeting, item.title, item.start, item.end, item.room, item.owner);
      })));
    });
    this.getByPotentialMember(user.login).subscribe(data => {
      this.meetingsDateSource.next(this.meetingsDateSource.value.concat(data.map(item => {
        return new Meeting(item.idMeeting, item.title, item.start, item.end, item.room, item.owner, colors.yellow);
      })));
    });
  }
}
