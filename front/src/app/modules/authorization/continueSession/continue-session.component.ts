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
    this.authService.refreshToken().subscribe(data =>
      window.localStorage.setItem('token', JSON.stringify(data))
    );
  }
}
