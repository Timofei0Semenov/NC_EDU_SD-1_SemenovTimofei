import {Component, OnInit} from '@angular/core';
import {CalendarDateFormatter, CalendarEventAction, CalendarView} from 'angular-calendar';
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
import {ShowMeetingComponent} from '../../../meeting/components/show-meeting/show-meeting.component';
import {MeetingAlarmComponent} from '../../../notification/components/meetingAlarm/meetingAlarm.component';

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
  actions: CalendarEventAction[] = [{
    label: '<i class="material-icons mat-icon">add_alarm</i>',
    onClick: ({event}: { event: Meeting }): void => {
      this.dialog.open(MeetingAlarmComponent, {width: '30%', data: event});
    }
  }];

  constructor(private authService: AuthService, private userService: UserService, private meetingsService: MeetingService,
              private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    if (!this.authService.isAuthorized()) {
      this.router.navigateByUrl('/login');
    }

    this.initUser();
  }


  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  initUser() {
    this.user = JSON.parse(window.localStorage.getItem('currentUser'));

    this.meetingsService.getByMember(this.user.login).subscribe(data => {
      this.events = data.map(item => {
        return new Meeting(item.idMeeting, item.title, item.start, item.end, item.room, item.owner, this.actions);
      });
      this.meetingsService.getByPotentialMember(this.user.login).subscribe(data => {
        this.events = this.events.concat(data.map(item => {
          return new Meeting(item.idMeeting, item.title, item.start, item.end, item.room, item.owner, this.actions, colors.yellow);
        }));
      });
    });
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
    this.dialog.open(ShowMeetingComponent, {data: event});
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  clickAdd() {
    const dialogRef = this.dialog.open(AddNewEventComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result != '') {
        this.events.push(new Meeting(result.idMeeting, result.title, result.start, result.end, result.room,
          result.owner, this.actions));
      }
    });
  }
}

