/********************************************************************************* 
 * WEB422 – Assignment 05 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this 
 * assignment has been copied manually or electronically from any other source (including web sites) or 
 * distributed to other students. *
 * Name: Ahmad Jafari Student ID: 143469195  Date: 19-11-2021 * 
 * ********************************************************************************/

import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'as4';
  searchString: string = "";
 
  constructor(private router: Router
  ) { }



  handleSearch() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchString }} );
    this.searchString= "";
  }

}
