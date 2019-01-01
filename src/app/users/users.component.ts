import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from './model';

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

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(
      data => this.users = data
    );
  }

  //TODO
  /*getOneUser(value: string) {
    this.apiResponse = false;
    this.allUsers = false;

    //this.get_A_User = this.data.getOneUser(value);  
    alert(value);
    
    return this.data.getOneUser(value).subscribe(apiRes => {
      this.get_A_User = apiRes,
      this.apiResponse = apiRes.userName == value
    });
  }*/

  /*getOneUser(value: string) {
    this.apiResponse = false;
    this.allUsers = false;

    //this.get_A_User = this.data.getOneUser(value);  
    
    this.data.getUsers().subscribe((data : User[]) => {
      let i = 0;
      do {
        alert("TEST"+i);
        if(data[i].userName == value) {
          this.get_A_User = data[i];
          this.apiResponse = true;
        }
        i++;
      } while(i <= data.length && data[i-1].userName != value);
      alert(this.get_A_User);
    });    
  }*/

  modifyUser(id: Number) {
    this.modify_user = true;
  }

  getAllUsersBack() {
    this.allUsers = true;
    this.modify_user = false;
  }
}
