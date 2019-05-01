import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../../../services/user.service';
import {MessageService} from '../../../../services/message.service';
import {Message} from '../../../message/model/message';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  user: User;
  allUsers: User[] = [];

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
    });
  }

  addToFriend(user: User) {
    this.messageService.saveMessage(new Message(null, this.user, user, null, 'friend')).subscribe();
  }
}
