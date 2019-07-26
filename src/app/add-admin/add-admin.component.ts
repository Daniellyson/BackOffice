import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
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
  newFormUser: User = new User;
  form: Object;
  users: User[];

  wrongName: boolean = false;
  wrongEmail: boolean = false;
  wrongPhone: boolean = false;
  noGender: boolean = false;

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

  //TODO

  onSubmit(form: NgForm) {

    if(form.value.password != form.value.passwordConfirm) {
      form.value.password = "";
      form.value.passwordConfirm = "";
      alert("Your password is not correct");
    }

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
        for(var iUser = 0; iUser < this.users.length && this.users[iUser].userName != this.newFormUser.userName; iUser++) { }
        if(iUser < this.users.length && this.users[iUser].userName == this.newFormUser.userName) {
          document.getElementById("userName").style.cssText = "border: 2px solid red";
          this.wrongName = true;
          alert("User name already used \n\n Please choose another User name");
        }
      }
      
      if(this.newFormUser.email != "") {
        for(var iMail = 0; iMail < this.users.length && this.users[iMail].email != this.newFormUser.email; iMail++) { }
        if(iMail < this.users.length && this.users[iMail].email == this.newFormUser.email) {
          document.getElementById("email").style.cssText = "border: 2px solid red";
          this.wrongEmail = true;
          alert("Email not valid \n\n Please check your e-mail");
        }
      }      
     
      if(this.newFormUser.phone != "") {
        for(var iPhone = 0; iPhone < this.users.length && this.users[iPhone].phone != this.newFormUser.phone; iPhone++) { }
        if(iPhone < this.users.length && this.users[iPhone].phone == this.newFormUser.phone && iPhone < this.users.length) {
          document.getElementById("phone").style.cssText = "border: 2px solid red";
          this.wrongPhone = true;
          alert("Phone number not valid \n\n Please check your phone number");
        }
      }      

      if(form.value.gender == "") {
        this.noGender = true;
        alert("Please select your gender");
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