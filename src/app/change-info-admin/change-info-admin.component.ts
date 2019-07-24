import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../users/userModel';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-info-admin',
  templateUrl: './change-info-admin.component.html',
  styleUrls: ['./change-info-admin.component.css']
})
export class ChangeInfoAdminComponent implements OnInit {

  changePasswordForm: FormGroup;
  userName: string;
  idAdmin: string;

  old_Password: string;
  new_Password: string;
  confirm_new_Password: string;

  constructor(private router : Router, private dataService: DataService) {
    /*this.changePasswordForm = formBuilder.group({
      'old_Password': [null, Validators.required],
      'new_Password': [null, Validators.required],
      'confirm_new_password': [null, [Validators.required]] 
    });*/
  }

  ngOnInit() {
    this.userName = localStorage.getItem("administrator");

    this.dataService.getUsers().subscribe((data : User[]) =>  {
      for(var iUser = 0; iUser < data.length && data[iUser].userName != this.userName; iUser++) { }
      this.idAdmin = data[iUser].id;
    });
  }

  onSubmit(old_Password: string, new_Password: string, confirm_new_Password: string) {

    if(new_Password != confirm_new_Password) {
      alert("Inside of condition not same password");
      new_Password = "0";
      confirm_new_Password = "0";
    }
    
    this.dataService.updatePassword(this.idAdmin, old_Password, new_Password).subscribe((data : User) => {

      alert("Your password has been updated");
      this.router.navigate(['mainWindow']);
      
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
      alert("Your password is not correct");
    });
  }

}
