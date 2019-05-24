import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../../user/models/user';
import {Room} from '../../../room/models/room';
import {RoomService} from '../../../../services/room.service';
import {Meeting} from '../../models/meeting';
import {MeetingService} from '../../../../services/meeting.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.css'],
  providers: [DatePipe]
})
export class EditMeetingComponent implements OnInit {

  today = new Date();
  user: User;
  allRooms: Room[] = [];
  newMeeting: Meeting;
  checkingMessage = '';
  formGroup: FormGroup;
  title: string;
  start: Date;
  end: Date;
  room: Room;

  constructor(@Inject(MAT_DIALOG_DATA) public meeting: Meeting, public dialogRef: MatDialogRef<EditMeetingComponent>,
              private roomService: RoomService, private meetingService: MeetingService, public datepipe: DatePipe,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('currentUser'));
    this.roomService.getAllRooms().subscribe(data => {
      this.allRooms = data.map(item => {
        return new Room(item.idRoom, item.name, item.address);
      });
    });
    this.createForm();
    this.title = this.meeting.title;
    this.start = this.meeting.start;
    this.end = this.meeting.end;
    this.room = this.meeting.room;
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      titleFormControl: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ]]
    });
  }

  onClickUpdate(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.newMeeting = new Meeting(null, this.title, this.start, this.end, this.room, this.user, null);
    this.checkingMessage = '';
    const busy = 'This room isn\'t available from ' + this.datepipe.transform(this.meeting.start, 'd MMM yyyy HH:mm') +
      ' to ' + this.datepipe.transform(this.meeting.end, 'd MMM yyyy HH:mm') + ' by ' + this.meeting.title;

    this.roomService.checkRoom(this.newMeeting).subscribe(result => {
      this.checkingMessage = result;
      if (this.checkingMessage === 'Room is free special for you!♥' ||
        this.checkingMessage === busy) {
        this.updateMeeting();
      }
    });
  }

  updateMeeting() {
    this.meetingService.updateMeeting(this.newMeeting, this.meeting.idMeeting).subscribe(data => {
      this.meeting.title = this.title;
      this.meeting.start = this.start;
      this.meeting.end = this.end;
      this.meeting.room = this.room;
    });
    this.dialogRef.close();
  }

  getTitleErrorMessage() {
    return this.formGroup.get('titleFormControl').hasError('required') ? 'You must input title' :
      this.formGroup.get('titleFormControl').hasError('minlength') ? 'Minimum length 4 symbols' :
        this.formGroup.get('titleFormControl').hasError('maxlength') ? 'Maximum length 30 symbols' :
          '';
  }
}
