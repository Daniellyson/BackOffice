import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TopPageComponent } from '../top-page/top-page.component';
import { User } from '../users/userModel';

const incorrectLogin: string = "Username or password incorrect";
const notAdm: string = "You are not a administrator. \nPlease Contact : https://github.com/Daniellyson "

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = true; 
  backoffice: boolean = false;

  constructor(private userService : DataService, private router : Router) { }

  ngOnInit() {
    if(localStorage.getItem('logged')) {
      this.router.navigate(['mainWindow']);
    }
  }
  
  onSubmit(userName: string, password: string) {
    
    this.userService.userAuthentication(userName, password).subscribe((data : any) => {

      this.userService.changeAdmin(userName);

      localStorage.setItem('administrator', userName);

      localStorage.setItem('userToken', data.access_token);

      localStorage.setItem('logged', 'true');

      localStorage.setItem('firstTime', 'true');

      localStorage.setItem('passowrd', password);
      
      this.userService.setEventEmit(true);

      this.authAdministrator(data);
    },
    (err : HttpErrorResponse) => {
      this.userService.setEventEmit(false);
      this.isLogin = false;
      alert(incorrectLogin);
    });
  }

  authAdministrator(data : any) {    
    
    this.userService.getUserById(data.userId).subscribe((dataUser : User) => {

      this.backoffice = (dataUser.role == "backoffice");

      if(this.backoffice) {
        alert("Welcome");
        this.ngOnInit();
      }
      else {
        this.userService.setEventEmit(false);
        this.isLogin = false;
        alert(notAdm);
        this.userService.logout();
      }
    });
  }
}
