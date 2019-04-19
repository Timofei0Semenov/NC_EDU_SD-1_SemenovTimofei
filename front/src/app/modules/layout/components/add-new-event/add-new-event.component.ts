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
  icon = 'add';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  clickAdd() {
    this.isAddNew = !this.isAddNew;
    if (!this.isAddNew) {
      this.icon = 'add';
    } else {
      this.icon = 'arrow_back';
    }
  }

  creatMeeting(): void {
  }


}
