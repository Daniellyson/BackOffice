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
  newFormUser: User[];
  form: Object;

  constructor(private formBuilder: FormBuilder, private router: Router, private user: UsersComponent, private userService: DataService) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");

    this.editForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators],
      address: ['', Validators.required],
      locality: ['', Validators.required],
      postalCode: ['', Validators.required],
    	trustedCarpoolingDriverCode: ['', Validators]
    });
    
    this.userService.getUsers().subscribe((data: User[]) => {

      this.newFormUser = data.filter(uniqueUser => uniqueUser.id == userId);      
      
      this.form =  {
        "userName" : this.newFormUser[0].userName,
        "email": this.newFormUser[0].email,
        "phone": this.newFormUser[0].phone,
        "address": this.newFormUser[0].address,
        "locality": this.newFormUser[0].locality,
        "postalCode": this.newFormUser[0].postalCode,
        "trustedCarpoolingDriverCode": this.newFormUser[0].trustedCarpoolingDriverCode
      };

      this.editForm.setValue(this.form);
    });
  }

  onSubmit(form: NgForm) {
    let userId = localStorage.getItem("editUserId");    

    this.newFormUser[0].userName = form.value.userName;
    this.newFormUser[0].email = form.value.email;
    this.newFormUser[0].phone = form.value.phone;
    this.newFormUser[0].address = form.value.address;
    this.newFormUser[0].locality = form.value.locality;
    this.newFormUser[0].postalCode = form.value.postalCode;
    this.newFormUser[0].trustedCarpoolingDriverCode = form.value.trustedCarpoolingDriverCode;

    this.userService.updateUser(userId, this.newFormUser[0]).subscribe(data => {
      this.backToAllUsers();
    },
    (err : HttpErrorResponse) => {

      var inputs = document.querySelectorAll("input");
      
      for(let inp = 0; inp < inputs.length; inp++) {
          
        if(inputs[inp].required && inputs[inp].value == "") {
            
            inputs[inp].style.cssText = "border: 1px solid red";
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
