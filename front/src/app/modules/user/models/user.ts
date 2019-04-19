import {Meeting} from '../../meeting/models/meeting';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  login: string;
  role: string;
  email: string;
  password: string;
  meetings: Meeting[];
  meetingsCreatedMe: Meeting[];


  constructor(id: string, firstName: string, lastName: string, login: string, role: string,
              email: string, password: string, meetings: Meeting[], meetingsCreatedMe: Meeting[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.login = login;
    this.role = role;
    this.email = email;
    this.password = password;
    this.meetings = meetings;
    this.meetingsCreatedMe = meetingsCreatedMe;
  }
}
