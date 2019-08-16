import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import {FormBuilder, FormGroup, Validators, NgForm} from "@angular/forms";
import { DataService } from '../data.service';
import { User } from '../users/userModel';
import { HttpErrorResponse } from '@angular/common/http';


const regexEmail : RegExp = new RegExp("[^@]+@[^\.]+\..+");
const regexPhone : RegExp = new RegExp("^0[1-68]([-. ]?\\d{2}){4}$");
const regexAddress : RegExp = new RegExp("(^[a-zA-Z'\\s]+)(\\d+\\s)?([a-zA-Z'\\s]+)?(\,\\s)(\\d+)");
const regexLocality : RegExp = new RegExp("^[A-z,' -]+$");
const regexPostalCode : RegExp = new RegExp("\\d{4,5}$");

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  notValidEmail: boolean;
  notValidPhone: boolean;
  notValidAddress: boolean;
  notValidLocality: boolean;
  notValidPostalCode: boolean;

  editForm: FormGroup;
  newFormUser: User;
  form: Object;

  constructor(private formBuilder: FormBuilder, private router: Router, private user: UsersComponent, private userService: DataService) { }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      //userName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators],
      address: ['', Validators.required],
      locality: ['', Validators.required],
      postalCode: ['', Validators.required],
    	trustedCarpoolingDriverCode: ['', Validators]
    });

    this.userService.getUserById(localStorage.getItem("editUserId")).subscribe(data => {

      this.newFormUser = data;

      this.getNewFormUser();   
    });
  }

  getNewFormUser() {

    this.form =  {
      //"userName" : this.newFormUser.userName,
      "email": this.newFormUser.email,
      "phone": this.newFormUser.phone,
      "address": this.newFormUser.address,
      "locality": this.newFormUser.locality,
      "postalCode": this.newFormUser.postalCode,
      "trustedCarpoolingDriverCode": this.newFormUser.trustedCarpoolingDriverCode
    };

    this.editForm.setValue(this.form);
  }

  onSubmit(form: NgForm) {

    this.notValidEmail = false;
    this.notValidPhone = false;
    this.notValidAddress = false;
    this.notValidLocality = false;
    this.notValidPostalCode = false;

    //userId = localStorage.getItem("editUserId");    
    //this.newFormUser.userName = form.value.userName;
    this.newFormUser.email = form.value.email;
    this.newFormUser.phone = form.value.phone;
    this.newFormUser.address = form.value.address;
    this.newFormUser.locality = form.value.locality;
    this.newFormUser.postalCode = form.value.postalCode;
    this.newFormUser.trustedCarpoolingDriverCode = form.value.trustedCarpoolingDriverCode;

    if(this.newFormUser.email != "") {
      if(!regexEmail.test(this.newFormUser.email)) {
        this.notValidEmail = true;
      }
    }
    if(this.newFormUser.phone != "") {
      if(!regexPhone.test(this.newFormUser.phone)) {
        this.notValidPhone = true;
      }
    }
    if(this.newFormUser.address != "") {
      if(!regexAddress.test(this.newFormUser.address)) {
        this.notValidAddress = true;
        this.newFormUser.address = "";
      }
    }
    if(this.newFormUser.locality != "") {
      if(!regexLocality.test(this.newFormUser.locality)) {
        this.notValidLocality = true;
      }
    }
    if(this.newFormUser.postalCode != "") {
      if(!regexPostalCode.test(this.newFormUser.postalCode)) {
        this.notValidPostalCode = true;
      }
    }



    this.userService.updateUser(localStorage.getItem("editUserId"), this.newFormUser).subscribe(() => {
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

      if(err.status == 500) {
        alert("Sorry un error occured : " + err.statusText + " (" +  err.status + ") \n Please check your email informations or contact an Admin");
      }
    }); 
  }

  backToAllUsers() {
    //localStorage.removeItem("editUserId");
    //this.user.ngOnInit();
    this.user.getUserByUserName(localStorage.getItem("editUserId"));
    this.user.modify_user = false;
    this.router.navigate(['../mainWindow/users']);
  }  
}
