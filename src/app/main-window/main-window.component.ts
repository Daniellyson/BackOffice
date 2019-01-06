import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {

  //TODO block access main page throw url
  showMainPage: boolean = false;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    
    this.dataService.showPage.subscribe((show: boolean) => {
    
      this.showMainPage = show;

      let admin = localStorage.getItem('administrator');
      this.dataService.changeAdmin(admin);
      
      if(localStorage.getItem('logged') == 'true') {
        
        this.showMainPage = true;
      }

      if(this.showMainPage) {
        this.router.navigate(['mainWindow']);
      }
      else {
        this.router.navigate(['']);
      }
      
    });
  }
}
