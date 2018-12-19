import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  constructor(private router: Router, private user: UsersComponent) { }

  ngOnInit() {
    
  }

  backToAllUsers() {
    this.user.modify_user = false;
    this.router.navigate(['../mainWindow/users']);
  }  
}
