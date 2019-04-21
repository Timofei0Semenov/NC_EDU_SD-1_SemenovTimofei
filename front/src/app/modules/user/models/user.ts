export class User {
  idUser: string;
  firstName: string;
  lastName: string;
  login: string;
  role: string;
  email: string;
  password: string;

  constructor(idUser: string, firstName: string, lastName: string, login: string, role: string,
              email: string, password: string) {
    this.idUser = idUser;
    this.firstName = firstName;
    this.lastName = lastName;
    this.login = login;
    this.role = role;
    this.email = email;
    this.password = password;
  }
}
