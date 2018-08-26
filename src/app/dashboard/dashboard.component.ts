import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id: string;
  post: string;
  name: string;
  errorMessage: string;
  key: string = 'categories';
  response;
  data;
  
  constructor(private router: Router, public authService: AuthService, private userService: UserService) {}
  ngOnInit() {
    this.id = localStorage.getItem('token');
    if (localStorage.getItem('isUserAdmin') === 'true') {
      this.post = 'Admin';
    } else {
      this.post = 'Commentator';
    }
    this.userService.getData().subscribe(
      data => {
        this.response = data;
        this.data = this.response[0].categories.slice(0,5);
      },
      error => this.errorMessage = <any>error
    );
    
  }

  onScrollDown(){
    if(this.data.length < this.response[0].categories.length){  
      let len = this.data.length;
 
      for(var i = len; i <= len; i++){
        this.data.push(this.response[0].categories[i]);
      }
    }
  }

  logout(): void {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
