import {Component, OnInit} from '@angular/core';
import {User} from '../../../user/models/user';
import {UserService} from '../../../../services/user.service';
import {Room} from '../../../room/models/room';
import {RoomService} from '../../../../services/room.service';
import {Meeting} from '../../models/meeting';
import {MeetingService} from '../../../../services/meeting.service';
import {MessageService} from '../../../../services/message.service';
import {Message} from '../../../message/model/message';

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
  members: User[] = [];
  room: Room;
  allRooms: Room[] = [];
  newMeeting: Meeting;
  messages: Message[] = [];

  constructor(private userService: UserService, private roomService: RoomService, private meetingService: MeetingService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('currentUser'));
    this.userService.getUsersByFriend(this.user.idUser).subscribe(data => {
      this.friends = data.map(item => {
        return new User(item.idUser, item.firstName, item.lastName, item.login, item.role, item.email, item.password);
      });
    });
    this.roomService.getAllRooms().subscribe(data => {
      this.allRooms = data.map(item => {
        return new Room(item.idRoom, item.name, item.city, item.street, item.house, item.building, item.flour, item.room);
      });
    });
  }

  createMeeting(): void {
    this.newMeeting = new Meeting(null, this.title, this.start, this.end, this.room, this.user, null);
    this.meetingService.saveMeeting(this.newMeeting).subscribe(data => {
      this.members.forEach( item => {
          this.messages.push(new Message(null, this.user, item, data, 'meeting'));
        }
      );
      this.messageService.saveAnyMessages(this.messages).subscribe();
    });
  }
}
