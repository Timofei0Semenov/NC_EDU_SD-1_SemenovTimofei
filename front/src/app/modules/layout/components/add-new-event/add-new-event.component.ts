import {Component, OnInit} from '@angular/core';
import {User} from '../../../user/models/user';
import {UserService} from '../../../../services/user.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.css']
})
export class AddNewEventComponent implements OnInit {

  today = new Date();
  title: string;
  start: Date;
  end: Date;
  user: User;
  friends: User[];
  members = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('currentUser'));
    this.userService.getUsersByFriend(this.user.idUser).subscribe(data => {
      this.friends = data.map(item => {
        return new User(item.idUser, item.firstName, item.lastName, item.login, item.role, item.email, item.password);
      });
    });
  }

  createMeeting(): void {
  }
}
