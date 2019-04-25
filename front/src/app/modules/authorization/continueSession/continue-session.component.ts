import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-sessiom',
  templateUrl: './continue-session.component.html',
  styleUrls: ['./continue-session.component.css']
})
export class ContinueSessionComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  accept() {
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', JSON.parse(window.localStorage.getItem('token')).refresh_token);
    this.authService.refreshToken(body.toString()).subscribe(data =>
      window.localStorage.setItem('token', JSON.stringify(data))
    );
  }
}
