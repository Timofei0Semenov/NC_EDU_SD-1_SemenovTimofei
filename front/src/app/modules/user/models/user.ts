import {Meeting} from '../../meeting/models/meeting';
import {token} from 'flatpickr/dist/utils/formatting';

export class User {
  id?: string;
  firstName: string;
  lastName: string;
  login: string;
  role: string;
  email: string;
  password: string;
  meetings?: Meeting[];
  meetingsCreatedMe?: Meeting[];

  constructor(firstName: string, lastName: string, login: string, role: string, email: string,
              password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.login = login;
    this.role = role;
    this.email = email;
    this.password = password;
  }
}
