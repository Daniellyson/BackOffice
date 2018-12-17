import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';

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

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(
      data => this.users = data
    )
  }

  getOneUser(value: string) {
    this.apiResponse = false;
    this.allUsers = false;
    
    this.get_A_User = this.data.getOneUser(value);    
    
    this.data.getOneUser(value).subscribe(apiRes => 
      this.apiResponse = apiRes[0].username == value
    );
  }

  getAllUsersBack() {
    this.allUsers = true;
  }
}
