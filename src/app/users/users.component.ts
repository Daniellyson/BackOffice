import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from './userModel';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { CurrencyIndex } from '@angular/common/src/i18n/locale_data';
import { ModifyUserComponent } from '../modify-user/modify-user.component';

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

  constructor(private data: DataService, private router: Router) {  }

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
    this.apiResponse = false;
    this.allUsers = false;
    this.data.getUsers().subscribe((data : User[]) => {
      for(var iUser = 0; iUser < data.length && data[iUser].userName != value; iUser++) { }
      this.apiResponse = (data[iUser].userName == value) 

      this.userByUserName = data.filter(uniqueUser => uniqueUser.userName == value);      
    });
  }

  //TODO
  getUserById(value: number) {

    alert("TEST 1 : "+value);

    this.data.getUsers().subscribe(apiRes => {
      alert("TEST 2 : "+value);
      alert(apiRes);
    });
  }

  modifyUser(id: Number) { 
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", id.toString());
    
    this.modify_user = true;
  }

  //TODO
  deleteUser(id: number) {
    if(confirm("Delete User ?")) {
      this.data.deleteUser(id).subscribe(user =>
        this.users = this.userByID.filter(u => u !== user)
      );
      //this.router.navigate(['../mainWindow/users'])
      this.getAllUsersBack();
    }    
  }

  getAllUsersBack() {
    this.allUsers = true;
    this.modify_user = false;
  }
}
