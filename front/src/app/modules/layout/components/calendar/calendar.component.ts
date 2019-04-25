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
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AddNewEventComponent} from '../../../meeting/components/add-new-event/add-new-event.component';

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

  constructor(private authService: AuthService, private userService: UserService, private meetingsService: MeetingService,
              private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    if (!this.authService.isAuthorized()) {
      this.router.navigateByUrl('/login');
    }
    this.user = JSON.parse(window.localStorage.getItem('currentUser'));
    this.meetingsService.getByMember(this.user.login).subscribe(data => {
      this.events = data.map(item => {
        return new Meeting(item.idMeeting, item.title, item.start, item.end, item.room, item.owner);
      });
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

  clickAdd() {
    this.dialog.open(AddNewEventComponent);
  }
}

