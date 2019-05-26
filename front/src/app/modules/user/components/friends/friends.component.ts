import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {User} from '../../models/user';
import {UserService} from '../../../../services/user.service';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent, MatDialog} from '@angular/material';
import {FriendCalendarComponent} from '../../../layout/components/friendCalendar/friend-calendar.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  user: User;
  friends: User[] = [];
  filteredFriends: Observable<User[]>;
  friendsControl = new FormControl();
  @ViewChild('friendInput') friendInput: ElementRef<HTMLInputElement>;

  constructor(private router: Router, private authService: AuthService, private userService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    if (!this.authService.isAuthorized()) {
      this.router.navigateByUrl('/login');
    }
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.friendsData.subscribe(data => {
      this.friends = data;
      this.filteredFriends = this.friendsControl.valueChanges.pipe(
        startWith(''),
        map(friend => friend ? this._filter(friend) : this.friends)
      );
    });
    this.initFriends();
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.friends.filter(friend => (friend.firstName + friend.lastName).toLowerCase().includes(filterValue));
  }

  selectFriend(event: MatAutocompleteSelectedEvent): void {
    this.friendInput.nativeElement.value = '';
    this.friendsControl.setValue(null);
    this.dialog.open(FriendCalendarComponent, {width: '95%', height: '95%', data: event.option.value});
  }

  initFriends() {
    this.userService.friendsDataSource.next([]);
    this.userService.getUsersByFriend(this.user.idUser).subscribe(data => {
      this.userService.friendsDataSource.next(this.userService.friendsDataSource.value.concat(data.map(item => {
        return new User(item.idUser, item.firstName, item.lastName, item.login, item.role, item.email, item.password);
      })));

    });
  }
}
