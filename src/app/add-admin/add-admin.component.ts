import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { User } from '../users/userModel';
import { Router } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../data.service';


const regexUserName : RegExp = new RegExp("^[a-zA-Z''-'\s]{1,40}$");
const regexPassword : RegExp = new RegExp(".{6,}");
const regexEmail : RegExp = new RegExp("[^@]+@[^\.]+\..+");
const regexPhone : RegExp = new RegExp("^[0-9\-\+]{9,15}$");
//TODO
const regexAddress : RegExp = new RegExp("[a-zA-Z]+ (\\,)? (\d{1,})?");
const regexLocality : RegExp = new RegExp("^[A-z,' -]+$");
const regexPostalCode : RegExp = new RegExp("\\d{4,5}$");


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})

export class AddAdminComponent implements OnInit {

  readonly backoffice = "backoffice";
  addForm: FormGroup;
  newFormUser: User = new User;
  form: Object;
  users: User[];

  takenName: boolean;
  notValidName: boolean;

  passwordNotMatching: boolean;
  notValidPassword: boolean;

  noGender: boolean;

  takenEmail: boolean;
  notValidEmail: boolean;

  takenPhone: boolean;
  notValidPhone: boolean;

  notValidAddress: boolean;
  notValidLocality: boolean;
  notValidPostalCode: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: DataService) { }
  
  ngOnInit() { 

    this.userService.getUsers().subscribe(
      (data : User[]) =>  {
        this.users = data;
    });

    this.addForm = new FormGroup({
      userName :  new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      passwordConfirm : new FormControl('', Validators.required),
      gender : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      phone : new FormControl('', null),
      address : new FormControl('', Validators.required),
      locality : new FormControl('', Validators.required),
      postalCode : new FormControl('', Validators.required)
    });
  }


  onSubmit(form: NgForm) {
    this.takenName = false;
    this.notValidName = false;

    this.notValidPassword = false;
    this.passwordNotMatching = false;

    this.noGender = false;

    this.takenEmail = false;
    this.notValidEmail = false;

    this.takenPhone = false;
    this.notValidPhone = false;

    this.notValidAddress = false;
    this.notValidLocality = false;
    this.notValidPostalCode = false;

    //TODO see if it is necessary
    this.form = form;

    this.newFormUser.role = this.backoffice;
    this.newFormUser.password = form.value.password;
    this.newFormUser.userName = form.value.userName;
    this.newFormUser.email = form.value.email;
    this.newFormUser.gender = form.value.gender;
    this.newFormUser.address = form.value.address;    
    this.newFormUser.phone = form.value.phone;    
    this.newFormUser.locality = form.value.locality;
    this.newFormUser.postalCode = form.value.postalCode;

    this.userService.addNewAdm(this.newFormUser).subscribe(() => {
      this.backToAllUsers();
    },
    (err : HttpErrorResponse) => {

      if(this.newFormUser.userName != "") {
        if(!regexUserName.test(this.newFormUser.userName)) {
          this.notValidName = true;
        } 
        else {
          for(var iUser = 0; iUser < this.users.length && this.users[iUser].userName != this.newFormUser.userName; iUser++) { }
          if(iUser < this.users.length && this.users[iUser].userName == this.newFormUser.userName) {
            this.takenName = true;
          }
        }
      }

      if(this.newFormUser.password != "") {
        if(!regexPassword.test(this.newFormUser.password)){
          this.notValidPassword = true;
        }
      }
      if(form.value.password != form.value.passwordConfirm) {
        this.passwordNotMatching = true;
      }
      
      if(this.newFormUser.email != "") {
        if(!regexEmail.test(this.newFormUser.email)) {
          this.notValidEmail = true;
        }
        else {
          for(var iMail = 0; iMail < this.users.length && this.users[iMail].email != this.newFormUser.email; iMail++) { }
          if(iMail < this.users.length && this.users[iMail].email == this.newFormUser.email) {
            this.takenEmail = true;
          }
        }      
      }      
     
      if(this.newFormUser.phone != "") {
        if(!regexPhone.test(this.newFormUser.phone)) {
          this.notValidPhone = true;
        }
        else {
          for(var iPhone = 0; iPhone < this.users.length && this.users[iPhone].phone != this.newFormUser.phone; iPhone++) { }
          if(iPhone < this.users.length && this.users[iPhone].phone == this.newFormUser.phone && iPhone < this.users.length) {
            this.takenPhone = true;
          }
        }
      }

      if(this.newFormUser.address != "") {
        if(!regexAddress.test(this.newFormUser.address)) {
          this.notValidAddress = true;
        }
      }

      if(this.newFormUser.locality != "") {
        if(!regexLocality.test(this.newFormUser.locality)) {
          this.notValidAddress = true;
        }
      }
      
      if(this.newFormUser.postalCode != "") {
        if(!regexPostalCode.test(this.newFormUser.postalCode)) {
          this.notValidPostalCode = true;
        }
      }

      if(form.value.gender == "") {
        this.noGender = true;
      }

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
    alert("backToAllUsers");
    this.router.navigate(['../mainWindow/users']);
  }
}