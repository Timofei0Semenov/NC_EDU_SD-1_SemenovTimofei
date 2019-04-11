import {Component, OnInit} from '@angular/core';
import {CalendarDateFormatter, CalendarView, DateAdapter} from 'angular-calendar';
import {isSameDay, isSameMonth} from 'date-fns';
import 'rxjs/add/operator/map';
import {User} from '../../../user/models/user';
import {Room} from '../../../room/models/room';
import {Meeting} from '../../../meeting/models/meeting';
import {MeetingService} from '../../../../services/meeting.service';
import {RoomService} from '../../../../services/room.service';
import {UserService} from '../../../../services/user.service';
import {CustomDateFormatter} from './custom-date.formatter.provider';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]

})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  events: Meeting[] = [];
  rooms: Room[] = [];
  allUsers: User[] = [];
  user: User;

  constructor(private meetingService: MeetingService, private roomService: RoomService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserById(1).subscribe((data: User) =>
      this.user = new User(data.id, data.firstName, data.lastName, data.login, data.role, data.email, data.meetings, data.meetingsCreatedMe));
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  dayClicked({date, events}: { date: Date; events: Meeting[] }): void {
    this.events = this.user.meetings;
    console.log(this.events);

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
