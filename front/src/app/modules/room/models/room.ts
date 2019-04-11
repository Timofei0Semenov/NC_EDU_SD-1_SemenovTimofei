import {Meeting} from '../../meeting/models/meeting';

export class Room {

  id: number;
  name: string;
  city: string;
  street: string;
  house: number;
  building?: number;
  flour: number;
  room: number;
  meetings: Meeting[];

  constructor(id: number, name: string, city: string, street: string, house: number, building: number,
              flour: number, room: number, meetings: Meeting[]) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.street = street;
    this.house = house;
    this.building = building;
    this.flour = flour;
    this.room = room;
    this.meetings = meetings;
  }
}
