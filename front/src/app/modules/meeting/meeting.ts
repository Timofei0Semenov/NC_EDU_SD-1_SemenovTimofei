import {CalendarEvent} from 'angular-calendar';
import {UserComponent} from '../user/user.component';
import {RoomComponent} from '../room/room.component';

export interface Meeting extends CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  /*owner: UserComponent;
  room: RoomComponent;
  members: UserComponent[];*/
}
