import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { User } from '../users/userModel';
import { Router } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  //TODO
  readonly backoffice = "backoffice";
  addForm: FormGroup;
  newFormUser: User;
  form: Object;
  userId: string;
  myPassword: string;
  myPasswordRepeat: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: DataService) { }
  
  ngOnInit() {  }

  onSubmit(form: NgForm) {

    this.myPassword = document.getElementById("password").nodeValue;
    this.myPasswordRepeat = document.getElementById("passwordRepeat").nodeValue;

    if(this.myPassword != this.myPasswordRepeat) {
      this.myPassword = "0";
      this.myPasswordRepeat = "0";
      alert("Your password is not correct");
    }

    this.newFormUser.userName = form.value.userName;
    this.newFormUser.password = form.value.password
    this.newFormUser.role = this.backoffice;
    this.newFormUser.email = form.value.email;
    this.newFormUser.phone = form.value.phone;
    this.newFormUser.address = form.value.address;
    this.newFormUser.locality = form.value.locality;
    this.newFormUser.postalCode = form.value.postalCode;

    this.userService.updateUser(this.userId, this.newFormUser).subscribe(() => {
      this.backToAllUsers();
    },
    (err : HttpErrorResponse) => {

      var inputs = document.querySelectorAll("input");
      
      for(let inp = 0; inp < inputs.length; inp++) {
          
        if(inputs[inp].required && inputs[inp].value == "") {
            
            inputs[inp].style.cssText = "border: 2px solid red";
        }
        else {
          inputs[inp].style.cssText = "none";
        }
      }
    }); 
  }

  backToAllUsers() {
    
    this.router.navigate(['../mainWindow/users']);
  }
}