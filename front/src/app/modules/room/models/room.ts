export class Room {

  idRoom: string;
  name: string;
  city: string;
  street: string;
  house: string;
  building?: string;
  flour: string;
  room: string;

  constructor(idRoom: string, name: string, city: string, street: string, house: string, building: string,
              flour: string, room: string) {
    this.idRoom = idRoom;
    this.name = name;
    this.city = city;
    this.street = street;
    this.house = house;
    this.building = building;
    this.flour = flour;
    this.room = room;
  }
}
