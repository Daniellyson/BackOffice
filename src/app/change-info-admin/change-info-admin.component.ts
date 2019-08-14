import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../users/userModel';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

const regexPassword: RegExp = new RegExp(".{6,}");
const password: string = localStorage.getItem("myPassword");

@Component({
  selector: 'app-change-info-admin',
  templateUrl: './change-info-admin.component.html',
  styleUrls: ['./change-info-admin.component.css']
})
export class ChangeInfoAdminComponent implements OnInit {

  idAdmin: string;

  old_Password: string;
  new_Password: string;
  confirm_new_Password: string;

  wrongPassword: boolean;
  passwordNotMatching: boolean;
  notValidPassword: boolean;
  notValidPasswordConfirm: boolean;
  old_new_password_Are_equals: boolean;

  constructor(private router : Router, private dataService: DataService) {  }

  ngOnInit() {
    const userName: string = localStorage.getItem("administrator");

    this.dataService.getUsers().subscribe((data : User[]) =>  {
      for(var iUser = 0; iUser < data.length && data[iUser].userName != userName; iUser++) { }
      this.idAdmin = data[iUser].id;
    });
  }

  onSubmit(old_Password: string, new_Password: string, confirm_new_Password: string) {

    this.wrongPassword = false;
    this.passwordNotMatching = false;
    this.notValidPassword = false;
    this.notValidPasswordConfirm = false;
    this.old_new_password_Are_equals = false;

    this.notValidPassword = (!regexPassword.test(new_Password));
    this.notValidPasswordConfirm = (!regexPassword.test(confirm_new_Password));
    this.wrongPassword = (password != old_Password);

    if(new_Password != "" && confirm_new_Password != "") {
      if(new_Password != confirm_new_Password) {
        this.passwordNotMatching = true;
        new_Password = "";
      }
      if(password == new_Password) {
        this.old_new_password_Are_equals = true;
        new_Password = "";
      }
    }
    
    this.dataService.updatePassword(this.idAdmin, old_Password, new_Password).subscribe((data : User) => {

      alert("Your password has been updated");
      this.router.navigate(['mainWindow']);
      
    },
    (error : HttpErrorResponse) => {

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

}
