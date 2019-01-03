import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DataService } from '../data.service';
import {first} from "rxjs/operators";
import { User } from '../users/userModel';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  editForm: FormGroup;
  newFormUser: User[];
  form: Object;

  constructor(private formBuilder: FormBuilder, private router: Router, private user: UsersComponent, private userService: DataService) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");

    //TODO take off alert
    alert("TEST USER ID GET ITEM : " + userId);

    this.editForm = this.formBuilder.group({
      //id: [],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      locality: ['', Validators.required],
      postalCode: ['', Validators.required],
    	trustedCarpoolingDriverCode: ['', Validators.required]

    });
    //parseInt(userId)
    this.userService.getUsers().subscribe((data: User[]) => {
      
      //for(var iUser = 0; iUser < data.length && data[iUser].id != parseInt(userId); iUser++) { } 

      this.newFormUser = data.filter(uniqueUser => uniqueUser.id == parseInt(userId));      
      
      this.form =  {
        "userName" : data[0].userName,
        "email": data[0].email,
        "phone": data[0].phone,
        "locality": data[0].locality,
        "postalCode": data[0].postalCode,
        "trustedCarpoolingDriverCode": data[0].trustedCarpoolingDriverCode
      };

      this.editForm.setValue(this.form);
    });
  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['../mainWindow/users']);
        },
        error => {
          alert("error: update");
        });
  }

  backToAllUsers() {
    this.user.modify_user = false;
    this.router.navigate(['../mainWindow/users']);
  }  
}
