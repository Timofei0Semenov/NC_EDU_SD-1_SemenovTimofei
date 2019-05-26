import {Component, OnInit} from '@angular/core';
import {User} from '../../../user/models/user';
import {UserService} from '../../../../services/user.service';
import {Room} from '../../../room/models/room';
import {RoomService} from '../../../../services/room.service';
import {Meeting} from '../../models/meeting';
import {MeetingService} from '../../../../services/meeting.service';
import {MessageService} from '../../../../services/message.service';
import {Message} from '../../../message/model/message';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.css']
})
export class AddNewEventComponent implements OnInit {

  today = new Date();
  user: User;
  friends: User[];
  members: User[] = [];
  allRooms: Room[] = [];
  newMeeting: Meeting;
  messages: Message[] = [];
  checkingMessage = '';
  formGroup: FormGroup;
  isInviteAll = false;

  constructor(public dialogRef: MatDialogRef<AddNewEventComponent>,
              private userService: UserService, private roomService: RoomService, private meetingService: MeetingService,
              private messageService: MessageService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('currentUser'));
    this.userService.friendsData.subscribe(data => this.friends = data);
    this.roomService.getAllRooms().subscribe(data => {
      this.allRooms = data.map(item => {
        return new Room(item.idRoom, item.name, item.address);
      });
    });
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      titleFormControl: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ]],
      startFormControl: ['', [
        Validators.required
      ]],
      endFormControl: ['', [
        Validators.required
      ]],
      roomFormControl: ['', [
        Validators.required
      ]]
    });
  }

  onClickCreate(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.newMeeting = new Meeting(null,
      this.formGroup.get('titleFormControl').value,
      this.formGroup.get('startFormControl').value,
      this.formGroup.get('endFormControl').value,
      this.formGroup.get('roomFormControl').value,
      this.user);
    this.checkingMessage = '';
    this.roomService.checkRoom(this.newMeeting).subscribe(result => {
      this.checkingMessage = result;
      if (this.checkingMessage === 'Room is free special for you!♥') {
        this.saveNewMeeting();
      }
    });
  }

  saveNewMeeting() {
    this.meetingService.saveMeeting(this.newMeeting).subscribe(data => {
      this.inviteFriends(data);
      this.meetingService.addOneToMeetings(new Meeting(data.idMeeting, data.title, data.start, data.end, data.room,
        data.owner));
      this.dialogRef.close();
    });
  }

  inviteFriends(data: any) {
    if (this.isInviteAll) {
      this.friends.forEach(item => {
        this.messages.push(new Message(null, this.user, item, data, 'meeting'));
      });
    } else {
      this.members.forEach(item => {
          this.messages.push(new Message(null, this.user, item, data, 'meeting'));
        }
      );
    }
    if (this.messages.length > 0) {
      this.messageService.saveAnyMessages(this.messages).subscribe();
    }
  }

  getTitleErrorMessage() {
    return this.formGroup.get('titleFormControl').hasError('required') ? 'You must input title' :
      this.formGroup.get('titleFormControl').hasError('minlength') ? 'Minimum length 4 symbols' :
        this.formGroup.get('titleFormControl').hasError('maxlength') ? 'Maximum length 30 symbols' :
          '';
  }

  getStartErrorMessage() {
    return this.formGroup.get('startFormControl').hasError('required') ? 'You must input start date' :
      '';
  }

  getEndErrorMessage() {
    return this.formGroup.get('endFormControl').hasError('required') ? 'You must input end date' :
      '';
  }

  getRoomErrorMessage() {
    return this.formGroup.get('roomFormControl').hasError('required') ? 'You must chose place' :
      '';
  }
}
