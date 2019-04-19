import {Component, OnInit} from '@angular/core';
import {CalendarDateFormatter, CalendarView} from 'angular-calendar';
import {isSameDay, isSameMonth} from 'date-fns';
import 'rxjs/add/operator/map';
import {User} from '../../../user/models/user';
import {Meeting} from '../../../meeting/models/meeting';
import {CustomDateFormatter} from './custom-date.formatter.provider';
import {AuthService} from '../../../../services/auth.service';
import {UserService} from '../../../../services/user.service';
import {MeetingService} from '../../../../services/meeting.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
  ],

})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  events: Meeting[] = [];
  user: User;

  constructor(private authService: AuthService, private userService: UserService, private meetingsService: MeetingService) {
  }

  ngOnInit() {
    /*this.authService.currentUser.subscribe(data => this.user = data);
    this.meetingsService.getAllMeetings().subscribe(data => {
      this.events = data.map(item => {
        return new Meeting(item.id, item.title, item.start, item.end, item.room, item.owner, item.members);
      });
    });*/
    /*this.userService.getUserById(1).subscribe((data: User) =>
      this.user = new User(data.id, data.firstName, data.lastName, data.login, data.role, data.email, data.password,
        data.meetings, data.meetingsCreatedMe));*/
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
