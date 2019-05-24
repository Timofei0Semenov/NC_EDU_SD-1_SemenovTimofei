import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../../../services/user.service';
import {MessageService} from '../../../../services/message.service';
import {Message} from '../../../message/model/message';
import {MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';
import {Meeting} from '../../../meeting/models/meeting';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-invite-friend',
  templateUrl: './invite-friend.component.html',
  styleUrls: ['./invite-friend.component.css']
})
export class InviteFriendComponent implements OnInit {
  user: User;
  friendsForInviting: User[] = [];
  displayedColumns: string[] = ['oneUser', 'select'];
  selection = new SelectionModel<User>(true, []);
  dataSource = new MatTableDataSource(this.friendsForInviting);
  messages: Message[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public meeting: Meeting, private authService: AuthService, private router: Router,
              private userService: UserService, private messageService: MessageService) {
  }

  ngOnInit() {
    if (!this.authService.isAuthorized()) {
      this.router.navigateByUrl('/login');
    }
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getFriendsForInviting(this.user.idUser, this.meeting.idMeeting).subscribe(data => {
      this.friendsForInviting = data.map(item => {
        return new User(item.idUser, item.firstName, item.lastName, item.login, item.role, item.email, item.password);
      });
      this.dataSource = new MatTableDataSource(this.friendsForInviting);
      this.dataSource.filterPredicate = (result: User, filter: string) => {
        return (result.firstName + result.lastName).toLowerCase().includes(filter);
      };
    });
  }

  public doFilter = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    console.log('asdasd');
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idUser + 1}`;
  }

  inviteFriends() {
    if (this.selection.selected.length > 0) {
      this.selection.selected.forEach(item => {
          this.messages.push(new Message(null, this.user, item, this.meeting, 'meeting'));
        }
      );
      this.messageService.saveAnyMessages(this.messages).subscribe();
    }
  }
}
