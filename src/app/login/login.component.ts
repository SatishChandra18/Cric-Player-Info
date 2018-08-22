import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../login';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: ILogin = { userid: 'anuragThakur', password: 'anuragThakur123' };
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  errorMessage = '';
  users: ILogin[] = [];
  isUserAdmin;

  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        console.log(this.users);
      },
      error => this.errorMessage = <any>error
    );
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/dashboard';
    this.authService.logout();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  setLoginDetails() {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', this.f.userid.value);
    localStorage.setItem('token', this.f.userid.value);
    localStorage.setItem('isUserAdmin', this.isUserAdmin);
    this.router.navigate([this.returnUrl]);
  }

  login() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    } else {
      if (this.users.find( (user) =>
      (user.userid === this.f.userid.value && user.password === this.f.password.value
        && this.f.userid.value === this.model.userid && this.f.password.value === this.model.password))) {
          this.isUserAdmin = 'true';
          this.setLoginDetails();
      } else if (this.users.find( (user) =>
       (user.userid === this.f.userid.value && user.password === this.f.password.value))) {
        this.isUserAdmin = 'false';
        this.setLoginDetails();
      } else  {
        this.message = 'Please check your userid and password';
      }
    }
  }
}
