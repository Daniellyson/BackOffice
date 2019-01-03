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

    this.editForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      locality: ['', Validators.required],
      postalCode: ['', Validators.required],
    	trustedCarpoolingDriverCode: ['', Validators.required]
    });
    
    this.userService.getUsers().subscribe((data: User[]) => {

      this.newFormUser = data.filter(uniqueUser => uniqueUser.id == parseInt(userId));      
      
      this.form =  {
        "userName" : this.newFormUser[0].userName,
        "email": this.newFormUser[0].email,
        "phone": this.newFormUser[0].phone,
        "locality": this.newFormUser[0].locality,
        "postalCode": this.newFormUser[0].postalCode,
        "trustedCarpoolingDriverCode": this.newFormUser[0].trustedCarpoolingDriverCode
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
