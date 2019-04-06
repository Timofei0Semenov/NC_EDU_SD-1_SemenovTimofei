import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id: string;
  firstName: string;
  lastName: string;
  login: string;
  role: string;

  /*meetings: CalendarEvent[];
  meetingsCreatedMe: CalendarEvent[];*/

  constructor() {
  }

  ngOnInit() {
  }

}
