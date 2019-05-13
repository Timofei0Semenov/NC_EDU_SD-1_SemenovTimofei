import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {User} from '../../../user/models/user';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AddFriendComponent} from '../../../user/components/add-friend/add-friend.component';
import {SimpleAlarmComponent} from '../../../notification/components/simpleAlarm/simpleAlarm.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    if (!this.authService.isAuthorized()) {
      this.router.navigateByUrl('/login');
    }
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  addFriends() {
    this.dialog.open(AddFriendComponent, {width: '30%'});
  }

  addAlarm() {
    this.dialog.open(SimpleAlarmComponent, {width: '30%', data: this.user});
  }
}
