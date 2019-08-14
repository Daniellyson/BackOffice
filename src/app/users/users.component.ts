import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from './userModel';
import { Router } from '@angular/router';
import { Car } from '../validation/carModel';
import { HttpErrorResponse } from '@angular/common/http';

const pageSize: number = 5;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: User[];

  userByUserName: User[];

  user: User;

  allUsers: boolean = true;

  apiResponse: boolean = true;

  modify_user: boolean = false;

  cars: Car[];
  userCar: any;

  resultPage: number = 0;
  totalPageUsers: number = 0;

  constructor(private dataService: DataService, private router: Router) {  }

  ngOnInit() {

    this.dataService.getUsers().subscribe((dataUser : User[]) => {
      //this.totalPageUsers = Math.ceil(dataUser.length/pageSize);
      this.users = dataUser;
    });

    /*this.dataService.getUsersPagination(this.resultPage).subscribe(
      (data : User[]) => {
        this.users = data;
      }
    );    
    this.getUsersOtherPage(this.resultPage);*/
  }

  getUserByUserName(value: string) {
    
    this.apiResponse = false;
    this.allUsers = false;
    
    this.dataService.getUserById(value).subscribe((data : User) => {

      this.apiResponse = data.id == value;

      this.user = data;

      console.log(data.userName);
            
      this.dataService.getCar().subscribe((car : Car[]) => { 
        
        this.cars = car  
        this.userCar = this.cars.filter(uniqueCarUser => uniqueCarUser.owner == data.id); 
      });
    });
  }

  modifyUser(id: string) { 
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", id);

    this.modify_user = true;
  }

  
  deleteUser(id: number) {
    if(confirm("Delete User?")) {
      this.dataService.deleteUser(id).subscribe(user => {
        this.getAllUsersBack();
      },
      (err : HttpErrorResponse) => {
        alert("Sorry un error occured : " + err.statusText + " (" +  err.status + ")");
      });
    } 
  }

  getAllUsersBack() {    
    this.ngOnInit();
    this.apiResponse = true;
    this.allUsers = true;
    this.modify_user = false;
  }

  /*getUsersOtherPage(value: number) {
    
    this.resultPage += value;
    if(this.resultPage >= 0 && this.resultPage <= this.totalPageUsers) {
      this.dataService.getUsersPagination(this.resultPage).subscribe(
        (data : User[]) => this.users = data
      );
    }
  }*/
}
