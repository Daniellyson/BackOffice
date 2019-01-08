import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TopPageComponent } from '../top-page/top-page.component';

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
