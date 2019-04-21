import {User} from '../../user/models/user';
import {Meeting} from '../../meeting/models/meeting';

export class Message {
  idMessage: string;
  sender: User;
  receiver: User;
  meeting: Meeting;
  target: string;


  constructor(idMessage: string, sender: User, receiver: User, meeting: Meeting, target: string) {
    this.idMessage = idMessage;
    this.sender = sender;
    this.receiver = receiver;
    this.meeting = meeting;
    this.target = target;
  }
}
