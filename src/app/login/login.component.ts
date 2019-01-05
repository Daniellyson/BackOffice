import { Component, OnInit, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { NgForOf } from '@angular/common';
import { UsersComponent } from '../users/users.component';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../users/userModel';
import { TopPageComponent } from '../top-page/top-page.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = true; 

  topPage: TopPageComponent;

  constructor(private userService : DataService, private router : Router) { }

  ngOnInit() {
  }
  
  // TODO error messages
  onSubmit(userName: string, password: string) {
    
    this.userService.userAuthentication(userName, password).subscribe((data : any) => {

      this.userService.changeAdmin(userName);

      localStorage.setItem('administrator', userName);

      localStorage.setItem('userToken', data.access_token);

      localStorage.setItem('logged', 'true');
      
      this.userService.setEventEmit(true);

      this.router.navigate(['mainWindow']);
      
    },
    (err : HttpErrorResponse) => {
      this.userService.setEventEmit(false);
      this.isLogin = false;
    });    
  }
}
