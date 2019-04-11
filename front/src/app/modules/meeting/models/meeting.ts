import {CalendarEvent} from 'angular-calendar';
import {Room} from '../../room/models/room';
import {User} from '../../user/models/user';

export class Meeting implements CalendarEvent {
  id: string;
  start: Date;
  title: string;
  end: Date;
  room: Room;
  owner: User;
  members: User[];


  constructor(id: string, title: string, start: Date, end: Date, room: Room, owner: User, members: User[]) {
    this.id = id;
    this.title = title;
    this.start = new Date(start);
    this.end = new Date(end);
    this.room = room;
    this.owner = owner;
    this.members = members;
  }
}
