import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable} from 'rxjs';
import 'rxjs/add/observable/timer';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ContinueSessionComponent} from '../../../authorization/continueSession/continue-session.component';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../../services/notification.service';
import {Notification} from '../../../notification/model/notification';
import {User} from '../../../user/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  firstTime: number;
  anotherTime: number;
  subscription: ISubscription;
  alarmSubscription: ISubscription;
  clock: any;
  notifications: Notification[] = [];
  user: User;

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router,
              private notifService: NotificationService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (!this.authService.isAuthorized()) {
      this.router.navigateByUrl('/login');
    }
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.notifService.getByOwner(this.user.login).subscribe(data => {
      this.notifications = data.map(item => {
        return new Notification(item.idNotification, item.text, item.alarmTime, item.delay, item.alarmOwner);
      });
      this.notifications.sort((a, b) => a.alarmTime.getTime() - b.alarmTime.getTime());
    });

    if (JSON.parse(window.localStorage.getItem('rememberMe')) == null) {
      this.firstTime = JSON.parse(window.localStorage.getItem('token')).expires_in * 1000 - 300000;
      this.anotherTime = this.firstTime + 300000;
      this.clock = Observable.timer(this.firstTime, this.anotherTime);
      this.subscription = this.clock.subscribe(val => {
        this.dialog.closeAll();
        this.dialog.open(ContinueSessionComponent);
      });
    }

    this.alarmSubscription = interval(30000).subscribe(() => {
      if (this.notifications.length != 0) {

        if (this.notifications[0].alarmTime.getTime() - new Date().getTime() < this.notifications[0].delay * 60000) {
          this.snackBar.open(this.notifications[0].text, 'Thanks');
          this.notifService.deleteNotification(this.notifications[0].idNotification).subscribe(result => {
            this.notifications.splice(0, 1);
          });
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
    this.alarmSubscription.unsubscribe();
  }
}
