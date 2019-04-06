import {Component, OnInit} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  id: number;
  name: string;
  city: string;
  street: string;
  house: number;
  building?: number;
  flour: number;
  room: number;
  meetings: CalendarEvent[];

  constructor() {
  }

  ngOnInit() {
  }

}
