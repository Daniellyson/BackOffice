import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from './userModel';
import { Router } from '@angular/router';
import { Car } from '../validation/carModel';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: Object;

  userByID: User[];
  userByUserName: any;

  allUsers: boolean = true;

  apiResponse: boolean = true;

  modify_user: boolean = false;

  cars: Car[];
  userCar: any;

  constructor(private dataService: DataService, private router: Router) {  }

  ngOnInit() {
    this.dataService.getUsers().subscribe(
      data => this.users = data
    );
  }

  getUserByUserName(value: string) {
    this.apiResponse = false;
    this.allUsers = false;
    this.dataService.getUsers().subscribe((data : User[]) => {
      for(var iUser = 0; iUser < data.length && data[iUser].userName != value; iUser++) { }
      this.apiResponse = (data[iUser].userName == value) 

      this.userByUserName = data.filter(uniqueUser => uniqueUser.userName == value);   
      
      this.dataService.getCar().subscribe((car : Car[]) => { 
        this.cars = car  

        this.userCar = this.cars.filter(uniqueCarUser => uniqueCarUser.owner == data[iUser].id); 
      });
    });
  }

  modifyUser(id: string) { 
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", id);

    this.modify_user = true;
  }

  
  deleteUser(id: number) {
    if(confirm("Delete User ?")) {
      this.dataService.deleteUser(id).subscribe(user => {
        this.getAllUsersBack();
        this.users = this.userByID.filter(u => u !== user);
      });
    } 
  }

  getAllUsersBack() {
    
    this.ngOnInit();
    this.allUsers = true;
    this.modify_user = false;
  }
}
