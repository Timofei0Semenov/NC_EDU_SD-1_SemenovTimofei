import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {User} from '../../../user/models/user';
import {Router} from '@angular/router';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    /*this.authService.currentUser.subscribe(data => this.user = data);*/
    /*this.userService.getUserByLogin('login').subscribe(data => this.user = new User(data.id, data.firstName,
      data.lastName, data.login, data.email, data.password, data.role, data.meetings, data.meetingsCreatedMe));*/

  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  logout() {
    /*this.authService.logout();*/
    this.router.navigateByUrl('/login');
  }

}
