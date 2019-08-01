import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { LoginComponent } from '../login/login.component';
import { User } from '../users/userModel';

const notAdm: string = "You are not a administrator. \nPlease Contact : https://github.com/Daniellyson "

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {

  showMainPage: boolean = false;
  backoffice: boolean= false;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getUserById(localStorage.getItem('userId')).subscribe((user : User) => {
      
      if(user != null) {
        this.backoffice = (user.role == "backoffice");
        if(!this.backoffice) {
          alert(notAdm);
          this.dataService.logout();
        }
      }
    });

    this.dataService.showPage.subscribe((show: boolean) => {
    
      this.showMainPage = show;

      let admin = localStorage.getItem('administrator');
      this.dataService.changeAdmin(admin);      
      
      if(localStorage.getItem('logged') == 'true') {
        
        this.showMainPage = true;
      }
      //TODO
      if(this.showMainPage) {
        this.router.navigate(['mainWindow']);
      }
      else {
        this.router.navigate(['']);
      }
      
    });
  }
}
