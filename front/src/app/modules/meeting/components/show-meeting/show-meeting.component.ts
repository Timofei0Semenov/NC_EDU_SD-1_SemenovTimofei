import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {Meeting} from '../../models/meeting';
import {UserService} from '../../../../services/user.service';
import {User} from '../../../user/models/user';

@Component({
  selector: 'app-show-meeting',
  templateUrl: './show-meeting.component.html',
  styleUrls: ['./show-meeting.component.css']
})
export class ShowMeetingComponent implements OnInit {
  members: User[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public meeting: Meeting, private userService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userService.getUsersByMeeting(this.meeting.idMeeting).subscribe(data => {
      this.members = data.map(item => {
        return new User(item.idUser, item.firstName, item.lastName, item.login, item.role, item.email, item.password);
      });
    });
  }

  showMembers() {
    this.dialog.open(MembersDialogComponent, {width: '15%', data: this.members})
    ;
  }
}

@Component({
  selector: 'members-dialog',
  templateUrl: 'members-dialog.html',
})
export class MembersDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public members: User[]) {
  }
}
