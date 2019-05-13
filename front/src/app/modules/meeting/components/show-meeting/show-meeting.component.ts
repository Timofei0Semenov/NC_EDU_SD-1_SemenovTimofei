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

  constructor(@Inject(MAT_DIALOG_DATA) public meeting: Meeting, private userService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showMembers() {
    this.dialog.open(MembersDialogComponent, {width: '15%', data: this.meeting.idMeeting});
  }

  showPotentialMembers() {
    this.dialog.open(PotentialMembersDialogComponent, {width: '15%', data: this.meeting.idMeeting});
  }

  showNoMembers() {
    this.dialog.open(NoMembersDialogComponent, {width: '15%', data: this.meeting.idMeeting});
  }
}

@Component({
  selector: 'members-dialog',
  templateUrl: 'members-dialog.html',
})
export class MembersDialogComponent implements OnInit {
  members: User[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public idMeeting: string, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsersByMeeting(this.idMeeting).subscribe(data => {
      this.members = data.map(item => {
        return new User(item.idUser, item.firstName, item.lastName, item.login, item.role, item.email, item.password);
      });
    });
  }
}

@Component({
  selector: 'potential-members-dialog',
  templateUrl: 'potentialMembers-dialog.html',
})
export class PotentialMembersDialogComponent implements OnInit {
  potentialMembers: User[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public idMeeting: string, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsersByPotentialMeeting(this.idMeeting).subscribe(data => {
      this.potentialMembers = data.map(item => {
        return new User(item.idUser, item.firstName, item.lastName, item.login, item.role, item.email, item.password);
      });
    });
  }
}

@Component({
  selector: 'no-members-dialog',
  templateUrl: 'noMembers-dialog.html',
})
export class NoMembersDialogComponent implements OnInit {
  noMembers: User[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public idMeeting: string, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsersByNoMeeting(this.idMeeting).subscribe(data => {
      this.noMembers = data.map(item => {
        return new User(item.idUser, item.firstName, item.lastName, item.login, item.role, item.email, item.password);
      });
    });
  }
}
