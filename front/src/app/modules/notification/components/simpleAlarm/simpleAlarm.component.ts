import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {User} from '../../../user/models/user';
import {NotificationService} from '../../../../services/notification.service';
import {Notification} from '../../model/notification';

@Component({
  selector: 'app-simple-alarm',
  templateUrl: './simpleAlarm.component.html'
})
export class SimpleAlarmComponent implements OnInit {
  text: string;
  alarmTime: Date;
  newNotification: Notification;
  today = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public user: User, private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  createNotification() {
    this.newNotification = new Notification(null, this.text, this.alarmTime, 0, this.user);
    this.notificationService.saveNotification(this.newNotification).subscribe();
  }
}
