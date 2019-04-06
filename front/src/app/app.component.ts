import {Component, OnInit} from '@angular/core';
import {CalendarView} from 'angular-calendar';
import {MeetingService} from './services/meeting.service';
import {RoomComponent} from './modules/room/room.component';
import {RoomService} from './services/room.service';
import {UserService} from './services/user.service';
import {UserComponent} from './modules/user/user.component';
import {Meeting} from './modules/meeting/meeting';
import {isSameDay, isSameMonth} from 'date-fns';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  rooms: RoomComponent[] = [];
  user: UserComponent;
  activeDayIsOpen: boolean = true;
  events: Meeting[] = [];

  /*Meeting[] = [
      {
        id: 1,
        start: new Date(),
        end: addHours(new Date(), 1),
        title: 'event 1',
        owner: new UserComponent(),
        room: new RoomComponent(),
        members: UserComponent[2] = [new UserComponent(), new UserComponent()]
      }];*/

  constructor(private meetingService: MeetingService, private roomService: RoomService,
              private userService: UserService) {
  }

  ngOnInit() {
    /*this.roomService.getAllRooms().subscribe((data: RoomComponent[]) => this.rooms = data);*/
    /*this.userService.getUserById('1').subscribe((data: UserComponent) => this.user = data);*/
    /*this.meetingService.getMeetingById(1).subscribe((data: Meeting) => this.events = [{
      id: data['id'],
      title: data['title'],
      start: new Date(data['start']),
      end: new Date(data['end'])
    }]);*/
    this.meetingService.getAllMeetings().subscribe(result => {
      this.events = result as Meeting[];
    });
    this.events.forEach(event => {
      event.start = new Date(event.start);
      event.end = new Date(event.end);
    });
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  dayClicked({date, events}: { date: Date; events: Meeting[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventClicked({event}: { event: Meeting }): void {
    console.log('Event clicked', event);
  }


  setView(view: CalendarView) {
    this.view = view;
  }
}
