import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DataService } from '../data.service';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private user: UsersComponent, private userService: DataService) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");

    alert("TEST USER ID GET ITEM : " + userId);

    this.editForm = this.formBuilder.group({
      id: [],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      locality: ['', Validators.required],
    	trustedCarpoolingDriverCode: ['', Validators.required]

    });

    this.userService.getUserById(+userId).subscribe( data => {
      this.editForm.setValue(data);
    });
  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      //.pipe(first())
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
