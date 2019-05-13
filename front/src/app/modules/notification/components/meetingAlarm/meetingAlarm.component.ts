import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {User} from '../../../user/models/user';
import {NotificationService} from '../../../../services/notification.service';
import {Notification} from '../../model/notification';
import {Meeting} from '../../../meeting/models/meeting';

@Component({
  selector: 'app-meeting-alarm',
  templateUrl: './meetingAlarm.component.html'
})
export class MeetingAlarmComponent implements OnInit {
  text: string;
  delay: number;
  newNotification: Notification;
  user: User;

  constructor(@Inject(MAT_DIALOG_DATA) public meeting: Meeting, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('currentUser'));
  }

  createNotification() {
    this.text = this.meeting.title + 'is soon! ' + this.text;
    this.newNotification = new Notification(null, this.text, this.meeting.start, this.delay, this.user);
    this.notificationService.saveNotification(this.newNotification).subscribe();
  }
}
