import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../../../services/user.service';
import {MessageService} from '../../../../services/message.service';
import {Message} from '../../../message/model/message';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  user: User;
  allUsers: User[] = [];
  displayedColumns: string[] = ['oneUser', 'button'];
  dataSource;
  heu = 'hui';

  constructor(private authService: AuthService, private router: Router, private userService: UserService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    if (!this.authService.isAuthorized()) {
      this.router.navigateByUrl('/login');
    }
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getNewFriends(this.user.idUser).subscribe(data => {
      this.allUsers = data.map(item => {
        return new User(item.idUser, item.firstName, item.lastName, item.login, item.role, item.email, item.password);
      });
      this.allUsers.splice(this.allUsers.findIndex(x => x.idUser === this.user.idUser), 1);
      this.dataSource = new MatTableDataSource(this.allUsers);
      this.dataSource.filterPredicate = (result: User, filter: string) => {
        return (result.firstName + result.lastName).toLowerCase().includes(filter);
      };
    });
  }

  public doFilter = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addToFriend(user: User) {
    this.heu = 'vam';
    this.messageService.saveMessage(new Message(null, this.user, user, null, 'friend')).subscribe();
  }
}
