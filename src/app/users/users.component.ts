import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from './userModel';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { CurrencyIndex } from '@angular/common/src/i18n/locale_data';

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

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.getUsers().subscribe(
      data => this.users = data
    );
      //TODO getOneUser(3) 3 : test change name of fonction in data.service
    /*this.data.getOneUser(3).subscribe((data: User[]) => {
        this.get_A_User = data;
    });*/
  }

  getUserByUserName(value: string) {
    this.apiResponse = false;//false
    this.allUsers = false;

    //this.get_A_User = this.data.getOneUser(value);  
    //getUserById
    this.data.getUsers().subscribe((data : User[]) => {
      for(var iUser = 0; iUser < data.length && data[iUser].userName != value; iUser++) { }
      
      this.userByUserName = data.filter(uniqueUser => uniqueUser.userName == value);
      //this.userByUserName = data[iUser];

      alert(this.userByUserName);
      this.apiResponse = true;
    });
  }

  //TODO
  /*getOneUser(value: number) {
    this.apiResponse = false;//false
    this.allUsers = false;

    //this.get_A_User = this.data.getOneUser(value);  
    //getUserById
    this.data.getUserById(value).subscribe(apiRes => {
      
      this.userByID = apiRes;
      //alert(this.get_A_User)
      this.apiResponse = true;
      alert(this.userByID);
    
    });
    alert(this.userByID);
  }*/

  modifyUser(id: Number) {
    
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", id.toString());
    //this.router.navigate(['edit-user']);
    
    this.modify_user = true;
  }
  //TODO
  /*deleteUser(id: number) {
    if(confirm("Delete User ?")) {
      this.data.deleteUser(id).subscribe(user =>
        this.users = this.userByID.filter(u => u !== user)
      );
      this.router.navigate(['../mainWindow/users'])
    }    
  }*/

  getAllUsersBack() {
    this.allUsers = true;
    this.modify_user = false;
  }
}
