import {Component, Inject, OnInit} from '@angular/core';
import {Meeting} from '../../models/meeting';
import {MeetingService} from '../../../../services/meeting.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatePipe} from '@angular/common';
import {AddNewEventComponent} from '../add-new-event/add-new-event.component';

@Component({
  selector: 'app-delete-meeting',
  templateUrl: './delete-meeting.component.html',
  styleUrls: ['./delete-meeting.component.css'],
  providers: [DatePipe]
})
export class DeleteMeetingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public meeting: Meeting, private meetingService: MeetingService,
              public dialogRef: MatDialogRef<AddNewEventComponent>) {
  }

  ngOnInit() {
  }

  deleteMeeting() {
    this.meetingService.deleteMeeting(this.meeting.idMeeting).subscribe(() => this.dialogRef.close(true));
  }
}
