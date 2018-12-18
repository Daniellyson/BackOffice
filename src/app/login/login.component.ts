import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { NgForOf } from '@angular/common';
import { UsersComponent } from '../users/users.component';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogin : boolean = true;

  isLoginError: boolean; //test login

  constructor(private userService : DataService, private router : Router) { }

  ngOnInit() {
  }
  
  onSubmit(name: string, password: string) {
    
    this.userService.getOneUser(name).subscribe(data => {
      this.isLogin = (data[0].username == name && data[0].username == password);
    });

    if(this.isLogin) {
      this.router.navigate(['mainWindow']);
    }
  }
  

  /*onSubmit(userName, password){
      this.userService.userAuthentication(userName, password).subscribe((data : any) => {
      localStorage.setItem('userToken', data.access_token);
      this.router.navigate(['/home']);
    },
    (err : HttpErrorResponse) => {
      this.isLoginError = true;
    });
  }*/
}
