import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private authService: AuthService) {
    /*this.createForm();*/
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
    /*this.authService.logout();*/
    window.localStorage.removeItem('token');
    this.createForm();
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const body = new HttpParams()
      .set('username', this.loginForm.get('usernameFormControl').value)
      .set('password', this.loginForm.get('passwordFormControl').value)
      .set('grant_type', 'password');

    this.authService.login(body.toString()).subscribe(data => {
      window.localStorage.setItem('token', JSON.stringify(data));
      console.log(window.localStorage.getItem('token'));
      this.router.navigate(['/home']);
    });
    }

    /*const val = this.loginForm.value;

    if (val.usernameFormControl && val.passwordFormControl) {
      this.authService.login(val.email, val.password)
        .subscribe(
          () => {
            console.log('User is logged in');
            this.router.navigateByUrl('/');
          }
        );
    }*/
}
