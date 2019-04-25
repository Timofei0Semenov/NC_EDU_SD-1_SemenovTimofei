import {Component, OnInit} from '@angular/core';
import {timer} from 'rxjs';
import 'rxjs/add/observable/timer';
import {MatDialog} from '@angular/material';
import {ContinueSessionComponent} from '../../../authorization/continueSession/continue-session.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    const source = timer(JSON.parse(window.localStorage.getItem('token')).expires_in * 1000 - 300000);
    source.subscribe(val => this.dialog.open(ContinueSessionComponent)
    );
  }
}
