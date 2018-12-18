import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: Object;

  get_A_User: Object;

  allUsers: boolean = true;

  apiResponse: boolean = true;

  modify_user: boolean = false;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.getUsers().subscribe(
      data => this.users = data
    );
  }

  getOneUser(value: string) {
    this.apiResponse = false;
    this.allUsers = false;
    
    this.get_A_User = this.data.getOneUser(value);    
    
    this.data.getOneUser(value).subscribe(apiRes => 
      this.apiResponse = apiRes[0].username == value
    );
  }

  modifyUser(id: Number) {
    //alert(id);
    //this.router.navigate(['modify-user']);
    this.modify_user = true;
  }

  getAllUsersBack() {
    this.allUsers = true;
    this.modify_user = false;
  }
}
