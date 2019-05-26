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
import {InviteFriendComponent} from '../../../user/components/invite-friend/invite-friend.component';
import {EditMeetingComponent} from '../../../meeting/components/edit-meeting/edit-meeting.component';
import {DeleteMeetingComponent} from '../../../meeting/components/delete-meeting/delete-meeting.component';

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
  },
    {
      label: '<i class="material-icons mat-icon">group_add</i>',
      onClick: ({event}: { event: Meeting }): void => {
        this.dialog.open(InviteFriendComponent, {width: '40%', data: event});
      }
    }];

  ownerActions: CalendarEventAction[] = [{
    label: '<i class="material-icons mat-icon">add_alarm</i>',
    onClick: ({event}: { event: Meeting }): void => {
      this.dialog.open(MeetingAlarmComponent, {width: '30%', data: event});
    }
  },
    {
      label: '<i class="material-icons mat-icon">group_add</i>',
      onClick: ({event}: { event: Meeting }): void => {
        this.dialog.open(InviteFriendComponent, {width: '40%', data: event});
      }
    },
    {
      label: '<i class="material-icons mat-icon">edit</i>',
      onClick: ({event}: { event: Meeting }): void => {
        this.dialog.open(EditMeetingComponent, {width: '40%', data: event});
      }
    },
    {
      label: '<i class="material-icons mat-icon">delete</i>',
      onClick: ({event}: { event: Meeting }): void => {
        this.dialog.open(DeleteMeetingComponent, {data: event});
      }
    }];

// ,
// {
//   label: '<i class="material-icons mat-icon">delete</i>',
//   onClick: ({event}: { event: Meeting }): void => {
//   const dialogRef = this.dialog.open(DeleteMeetingComponent, {data: event});
//   dialogRef.afterClosed().subscribe(result => {
//   if (result) {
//     this.events.splice(this.events.indexOf(event), 1);
//   }
// });
// }
// }

  constructor(private authService: AuthService, private userService: UserService, private meetingsService: MeetingService,
              private router: Router, public dialog: MatDialog) {
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
    this.meetingsService.meetingsData.subscribe(data => this.events = data);
    this.meetingsService.initMeetings(this.user);
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
        events.forEach(item => {
          if (item.start > new Date()) {
            if (item.owner.idUser == this.user.idUser) {
              item.actions = this.ownerActions;
            } else {
              item.actions = this.actions;
            }
          }
        })
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
    this.dialog.open(AddNewEventComponent);
  }
}



