import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id: string;
  post: string;
  constructor(private router: Router, public authService: AuthService) {}

  name:string;
  key: string = 'categories';
  data: Array<Object> = [
    {
      name: "Country",
      categories: [
        {
          name: "India",
          categories: [
              {
                name: "Virat Kohli",
                categories: [],
                role: "Batsman"
              },
              {
                name: "MS Dhoni",
                categories: [],
                role: "WicketKeeper"
              },
              {
                name: "Ajinkya Rahane",
                categories: [],
                role: "Batsman"
              },
              {
                name: "R. Ashwin",
                categories: [],
                role: "Bowler"
              }
            ]
          },
          {
            name: "Australia",
            categories: [
                {
                  name: "Steve Smith",
                  categories: [],
                  role: "Batsman"
                },
                {
                  name: "David Warner",
                  categories: [],
                  role: "Batsman"
                },
                {
                  name: "Mitchell Starc",
                  categories: [],
                  role: "Bowler"
                },
                {
                  name: "Tim Paine",
                  categories: [],
                  role: "WicketKeeper"
                }
              ]
          },
          {
            name: "South Africa",
            categories: [
                {
                  name: "AB De Villears",
                  categories: [],
                  role: "WicketKeeper"
                },
                {
                  name: "Hashim Amla",
                  categories: [],
                  role: "Batsman"
                },
                {
                  name: "Philander phil",
                  categories: [],
                  role: "Bowler"
                },
                {
                  name: "Kasigo Rabada",
                  categories: [],
                  role: "Bowler"
                }
              ]
          }
        ]
    }
  ];


  ngOnInit() {
    this.id = localStorage.getItem('token');
    if (localStorage.getItem('isUserAdmin') === 'true') {
      this.post = 'Admin';
    } else {
      this.post = 'Commentator';
    }
  }

  logout(): void {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
