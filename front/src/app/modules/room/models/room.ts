export class Room {

  id: number;
  name: string;
  city: string;
  street: string;
  house: number;
  building?: number;
  flour: number;
  room: number;

  constructor(id: number, name: string, city: string, street: string, house: number, building: number,
              flour: number, room: number) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.street = street;
    this.house = house;
    this.building = building;
    this.flour = flour;
    this.room = room;
  }
}
