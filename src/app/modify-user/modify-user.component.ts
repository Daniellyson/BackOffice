import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import {FormBuilder, FormGroup, Validators, NgForm} from "@angular/forms";
import { DataService } from '../data.service';
import { User } from '../users/userModel';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  editForm: FormGroup;
  newFormUser: User;
  form: Object;
  userId: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private user: UsersComponent, private userService: DataService) { }

  ngOnInit() {
    this.userId = localStorage.getItem("editUserId");

    this.editForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators],
      address: ['', Validators.required],
      locality: ['', Validators.required],
      postalCode: ['', Validators.required],
    	trustedCarpoolingDriverCode: ['', Validators]
    });

    this.userService.getUserById(this.userId).subscribe(data => {

      this.newFormUser = data;
      
      this.form =  {
        "userName" : this.newFormUser.userName,
        "email": this.newFormUser.email,
        "phone": this.newFormUser.phone,
        "address": this.newFormUser.address,
        "locality": this.newFormUser.locality,
        "postalCode": this.newFormUser.postalCode,
        "trustedCarpoolingDriverCode": this.newFormUser.trustedCarpoolingDriverCode
      };

      //TODO
      alert(this.newFormUser.role);

      if(this.newFormUser.role == "backoffice") {
        alert("test");
        document.getElementById("userName").setAttribute("readonly", "true");
      }

      this.editForm.setValue(this.form);
    });
  }

  onSubmit(form: NgForm) {
    this.userId = localStorage.getItem("editUserId");    

    this.newFormUser.userName = form.value.userName;
    this.newFormUser.email = form.value.email;
    this.newFormUser.phone = form.value.phone;
    this.newFormUser.address = form.value.address;
    this.newFormUser.locality = form.value.locality;
    this.newFormUser.postalCode = form.value.postalCode;
    this.newFormUser.trustedCarpoolingDriverCode = form.value.trustedCarpoolingDriverCode;

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
    this.user.ngOnInit();
    this.user.modify_user = false;
    this.router.navigate(['../mainWindow/users']);
  }  
}
