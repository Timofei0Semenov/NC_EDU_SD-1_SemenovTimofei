import {Component, Inject, OnInit} from '@angular/core';
import {CalendarDateFormatter, CalendarView} from 'angular-calendar';
import {isSameDay, isSameMonth} from 'date-fns';
import 'rxjs/add/operator/map';
import {Meeting} from '../../../meeting/models/meeting';
import {UserService} from '../../../../services/user.service';
import {MeetingService} from '../../../../services/meeting.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {ShowMeetingComponent} from '../../../meeting/components/show-meeting/show-meeting.component';
import {CustomDateFormatter} from '../calendar/custom-date.formatter.provider';
import {scheduleTick} from '@angular/core/src/render3/instructions';
import {asyncScheduler} from 'rxjs';

@Component({
  selector: 'friend-calendar',
  templateUrl: './friend-calendar.component.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
  ],

})
export class FriendCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  events: Meeting[] = [];

  constructor(private userService: UserService, private meetingsService: MeetingService,
              private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public login: string) {
    asyncScheduler
  }

  ngOnInit() {
    this.meetingsService.getByMember(this.login).subscribe(data => {
      this.events = data.map(item => {
        return new Meeting(item.idMeeting, item.title, item.start, item.end, item.room, item.owner, null);
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
    this.dialog.open(ShowMeetingComponent, {data: event});
  }


  setView(view: CalendarView) {
    this.view = view;
  }

}

