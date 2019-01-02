import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from './userModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: Object;

  get_A_User: User[];

  allUsers: boolean = true;

  apiResponse: boolean = true;

  modify_user: boolean = false;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.getUsers().subscribe(
      data => this.users = data
    );
      //TODO getOneUser(3) 3 : test change name of fonction in data.service
    this.data.getOneUser(3).subscribe((data: User[]) => {
        this.get_A_User = data;
    });
  }

  //TODO
  getOneUser(value: number) {
    this.apiResponse = false;
    this.allUsers = false;

    //this.get_A_User = this.data.getOneUser(value);  
    
    this.data.getUserById(value).subscribe((apiRes) => {
      
      //this.get_A_User = apiRes;

      this.apiResponse = true;
    });

  }

  modifyUser(id: Number) {
    
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", id.toString());
    //this.router.navigate(['edit-user']);
    
    this.modify_user = true;
  }

  deleteUser(id: number) {
    if(confirm("Delete User ?")) {
      this.data.deleteUser(id).subscribe(user =>
        this.users = this.get_A_User.filter(u => u !== user)
      );
      this.router.navigate(['../mainWindow/users'])
    }    
  }

  getAllUsersBack() {
    this.allUsers = true;
    this.modify_user = false;
  }
}
