import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})

export class TopPageComponent implements OnInit {

  title: string;
  adminName: string;

  constructor(private data: DataService, private router: Router){ }

  ngOnInit() {
    this.data.currentTitle.subscribe(title => this.title = title);
    this.data.currentAdmin.subscribe(admin => this.adminName = admin);
  }

  getTitle() {
    return this.title.toUpperCase();
  }

  //TODO
  changeTitle(title: string) {
    this.data.changeTitle("");
  }

  
  logout() {
    this.data.logout();
    /*localStorage.removeItem('userToken');
    localStorage.removeItem('logged');
    localStorage.removeItem('administrator');
    this.router.navigate(['']);*/
  }

  openNav() {
    if(window.matchMedia("(min-width: 601px)").matches) {
      document.getElementById("mySidebar").style.width = "250px";
    }
    else {
      document.getElementById("mySidebar").style.width = "125px";
    }
  }
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }
}
