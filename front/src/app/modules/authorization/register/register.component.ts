import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmPassword} from './confirmPassword';
import {UserService} from '../../../services/user.service';
import {User} from '../../user/models/user';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegistrationGroup: FormGroup;
  user: User;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isAuthorized()) {
      this.router.navigateByUrl('/home');
    }
    if (JSON.parse(window.localStorage.getItem('rememberMe'))) {
      this.authService.refreshToken().subscribe(data =>
        window.localStorage.setItem('token', JSON.stringify(data))
      );
      this.router.navigateByUrl('/home');
    }
    this.createForm();
  }

  createForm() {
    this.userRegistrationGroup = this.formBuilder.group({
      firstNameFormControl: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      lastNameFormControl: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]],
      loginFormControl: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]],
      emailFormControl: ['', [
        Validators.required,
        Validators.email
      ]],
      passwordGroup: this.formBuilder.group({
        passwordFormControl: ['', [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(20)
        ]],
        confirmPasswordFormControl: ['', Validators.required]
      }, {validators: ConfirmPassword('passwordFormControl', 'confirmPasswordFormControl')})
    });
  }

  getFirstNameErrorMessage() {
    return this.userRegistrationGroup.get('firstNameFormControl').hasError('required') ? 'You must input your firstName' :
      this.userRegistrationGroup.get('firstNameFormControl').hasError('minlength') ? 'Minimum length 3 symbols' :
        this.userRegistrationGroup.get('firstNameFormControl').hasError('maxlength') ? 'Maximum length 30 symbols' :
          'Invalid value';
  }

  getLastNameErrorMessage() {
    return this.userRegistrationGroup.get('lastNameFormControl').hasError('required') ? 'You must input your lastName' :
      this.userRegistrationGroup.get('lastNameFormControl').hasError('minlength') ? 'Minimum length 2 symbols' :
        this.userRegistrationGroup.get('lastNameFormControl').hasError('maxlength') ? 'Maximum length 40 symbols' :
          'Invalid value';
  }

  getLoginErrorMessage() {
    return this.userRegistrationGroup.get('loginFormControl').hasError('required') ? 'You must input  login' :
      this.userRegistrationGroup.get('loginFormControl').hasError('minlength') ? 'Minimum length 4 symbols' :
        this.userRegistrationGroup.get('loginFormControl').hasError('maxlength') ? 'Maximum length 20 symbols' :
          'Invalid value';
  }

  getEmailErrorMessage() {
    return this.userRegistrationGroup.get('emailFormControl').hasError('email') ? 'You must input  email' :
      'Invalid value';
  }

  getPasswordErrorMessage() {
    return this.userRegistrationGroup.get('passwordGroup').get('passwordFormControl').hasError('required') ?
      'You must input  password' :
      this.userRegistrationGroup.get('passwordGroup').get('passwordFormControl').hasError('minlength') ? 'Minimum length 7 symbols' :
        this.userRegistrationGroup.get('passwordGroup').get('passwordFormControl').hasError('maxlength') ? 'Maximum length 20 symbols' :
          'Invalid value';
  }

  getConfirmErrorMessage() {
    return this.userRegistrationGroup.get('passwordGroup').get('confirmPasswordFormControl').hasError('mustMatch') ?
      'Passwords are different' : '';
  }

  register() {
    if (this.userRegistrationGroup.invalid) {
      return;
    }
    this.user = new User(null, this.userRegistrationGroup.get('firstNameFormControl').value,
      this.userRegistrationGroup.get('lastNameFormControl').value,
      this.userRegistrationGroup.get('loginFormControl').value, 'user',
      this.userRegistrationGroup.get('emailFormControl').value,
      this.userRegistrationGroup.get('passwordGroup').get('passwordFormControl').value);

    this.userService.createUser(this.user).subscribe(login => {
      this.authService.login(this.userRegistrationGroup.get('loginFormControl').value,
        this.userRegistrationGroup.get('passwordGroup').get('passwordFormControl').value, false);
    });
  }

}

