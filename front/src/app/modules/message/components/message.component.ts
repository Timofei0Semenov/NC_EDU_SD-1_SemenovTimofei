import {Component, OnInit} from '@angular/core';
import {User} from '../../user/models/user';
import {Message} from '../model/message';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {MeetingService} from '../../../services/meeting.service';
import {UserService} from '../../../services/user.service';
import {MessageService} from '../../../services/message.service';
import {Meeting} from '../../meeting/models/meeting';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  user: User;
  messages: Message[] = [];

  constructor(private authService: AuthService, private router: Router, private userService: UserService,
              private messageService: MessageService, private meetingService: MeetingService) {
  }

  ngOnInit() {
    if (!this.authService.isAuthorized()) {
      this.router.navigateByUrl('/login');
    }
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.messageService.getByReceiver(this.user.login).subscribe(data => {
      this.messages = data.map(item => {
        return new Message(item.idMessage, item.sender, item.receiver, item.meeting, item.target);
      });
    });
  }

  accept(message: Message) {
    if (message.target == 'friend') {
      this.userService.addFriend(this.user, message.sender.login).subscribe(() => this.userService.addOneToFriends(message.sender));
    } else {
      this.meetingService.addMember(this.user, message.meeting.idMeeting).subscribe();
      this.meetingService.addOneToMeetings(new Meeting(message.meeting.idMeeting, message.meeting.title, message.meeting.start,
        message.meeting.end, message.meeting.room, message.meeting.owner));
    }
    this.messageService.deleteMessage(message.idMessage).subscribe(result => {
      this.messages.splice(this.messages.indexOf(message), 1);
    });
  }

  reject(message: Message) {
    if (message.target == 'meeting') {
      this.meetingService.addNoMember(this.user, message.meeting.idMeeting).subscribe();
    }
    this.messageService.deleteMessage(message.idMessage).subscribe(data => {
      this.messages.splice(this.messages.indexOf(message), 1);
    });
  }

  maybe(message: Message) {
    this.meetingService.addPotentialMember(this.user, message.meeting.idMeeting).subscribe();
    this.messageService.deleteMessage(message.idMessage).subscribe(data => {
      this.messages.splice(this.messages.indexOf(message), 1);
    });
    this.meetingService.addOneToMeetings(new Meeting(message.meeting.idMeeting, message.meeting.title, message.meeting.start,
      message.meeting.end, message.meeting.room, message.meeting.owner, colors.yellow));
  }
}
