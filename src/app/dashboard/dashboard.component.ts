import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {Observable, BehaviorSubject} from 'rxjs';
import { fromEvent } from 'rxjs';
import { merge } from 'rxjs';
import {distinct, filter, map, debounceTime, tap, flatMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id: string;
  post: string;
 

  name:string;
  key: string = 'categories';
  response = [
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
  data;
  

  constructor(private router: Router, public authService: AuthService) {}
  ngOnInit() {
    this.id = localStorage.getItem('token');
    if (localStorage.getItem('isUserAdmin') === 'true') {
      this.post = 'Admin';
    } else {
      this.post = 'Commentator';
    }
    this.data = this.response[0].categories.slice(0,5);
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
