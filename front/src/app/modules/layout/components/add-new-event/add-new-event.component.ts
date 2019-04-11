import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.css']
})
export class AddNewEventComponent implements OnInit {

  isAddNew = false;
  today: Date = new Date();
  title: string;
  start: Date;
  end: Date;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  creatMeeting(): void {

  }


}
