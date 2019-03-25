import { Component } from '@angular/core';
import {CalendarView} from "angular-calendar";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events = [];

  setView(view: CalendarView) {
    this.view = view;
  }
}
