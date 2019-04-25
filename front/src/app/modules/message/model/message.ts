import {User} from '../../user/models/user';
import {Meeting} from '../../meeting/models/meeting';

export class Message {
  idMessage: string;
  sender: User;
  receiver: User;
  meeting: Meeting;
  target: string;
  textMessage: string;


  constructor(idMessage: string, sender: User, receiver: User, meeting: Meeting, target: string) {
    this.idMessage = idMessage;
    this.sender = sender;
    this.receiver = receiver;
    this.meeting = meeting;
    this.target = target;
    if (this.target == 'friend') {
      this.textMessage = this.sender.firstName + ' ' + this.sender.lastName + ' want to add you to friends';
    } else if (this.target == 'meeting') {
      this.textMessage = this.sender.firstName + ' ' + this.sender.lastName + ' want to invite you to ' + this.meeting.title +
        ' meeting';
    }
  }
}
