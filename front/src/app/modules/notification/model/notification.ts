import {User} from '../../user/models/user';

export class Notification {
  idNotification: string;
  text: string;
  alarmTime: Date;
  delay: number;
  alarmOwner: User;


  constructor(idNotification: string, text: string, alarmTime: Date, delay: number, alarmOwner: User) {
    this.idNotification = idNotification;
    this.text = text;
    this.alarmTime = new Date(alarmTime);
    this.delay = delay;
    this.alarmOwner = alarmOwner;
  }
}
