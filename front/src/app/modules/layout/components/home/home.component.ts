import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/timer';
import {MatDialog} from '@angular/material';
import {ContinueSessionComponent} from '../../../authorization/continueSession/continue-session.component';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  firstTime: number;
  anotherTime: number;
  subscription: ISubscription;
  clock: any;

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (!this.authService.isAuthorized()) {
      this.router.navigateByUrl('/login');
    }
    if (JSON.parse(window.localStorage.getItem('rememberMe')) == null) {
      this.firstTime = JSON.parse(window.localStorage.getItem('token')).expires_in * 1000 - 300000;
      this.anotherTime = this.firstTime + 300000;
      this.clock = Observable.timer(this.firstTime, this.anotherTime);
      this.subscription = this.clock.subscribe(val => {
        this.dialog.closeAll();
        this.dialog.open(ContinueSessionComponent);
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}
