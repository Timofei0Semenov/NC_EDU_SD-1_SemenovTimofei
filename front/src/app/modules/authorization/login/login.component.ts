import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../user/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  hide = true;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private authService: AuthService, private userService: UserService) {
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      usernameFormControl: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]],
      passwordFormControl: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(20)
      ]]
    });
  }

  getUsernameErrorMessage() {
    return this.loginForm.get('usernameFormControl').hasError('required') ? 'You must input your login' :
      this.loginForm.get('usernameFormControl').hasError('minlength') ? 'Minimum length 4 symbols' :
        this.loginForm.get('usernameFormControl').hasError('maxlength') ? 'Maximum length 20 symbols' : 'Invalid value';
  }

  getPasswordErrorName() {
    return this.loginForm.get('passwordFormControl').hasError('required') ? 'You must input your password' :
      this.loginForm.get('passwordFormControl').hasError('minlength') ? 'Minimum length 7 symbols' :
        this.loginForm.get('passwordFormControl').hasError('maxlength') ? 'Maximum length 20 symbols' : 'Invalid value';
  }

  ngOnInit() {
    this.authService.logout();
    this.createForm();
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.get('usernameFormControl').value, this.loginForm.get('passwordFormControl').value);
    /*const body = new HttpParams()
      .set('username', this.loginForm.get('usernameFormControl').value)
      .set('password', this.loginForm.get('passwordFormControl').value)
      .set('grant_type', 'password');

    this.authService.login(body.toString()).subscribe(data => {
      window.localStorage.setItem('token', JSON.stringify(data));
      this.userService.getUserByLogin(this.loginForm.get('usernameFormControl').value)
        .subscribe((data2: User) => {
          this.user =
            new User(data2.idUser, data2.firstName, data2.lastName, data2.login, data2.role, data2.email, data2.password);
          window.localStorage.setItem('currentUser', JSON.stringify(this.user));
          if (this.authService.isAuthorized()) {
            this.router.navigateByUrl('/home');
          }
        });
    });*/
  }
}

