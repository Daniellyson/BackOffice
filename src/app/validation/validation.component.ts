import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Car } from './carModel';
import { forEach } from '@angular/router/src/utils/collection';
import { User } from '../users/userModel';
import { HttpErrorResponse } from '@angular/common/http';
import { injectArgs } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  pictures: Object;
  cars: Car[];  
  user: any;
  newFormUser: User[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCar().subscribe((data : Car[]) => { 
      this.cars = data;

      this.dataService.getUsers().subscribe((data : User[]) => {

        this.pictures = data;

        for(var iCar = 0; iCar < this.cars.length; iCar++) {
          for(var iUser = 0; iUser < data.length && data[iUser].id != this.cars[iCar].owner; iUser++) {  }

          this.newFormUser = data.filter(uniqueUser => uniqueUser.id == this.cars[iCar].owner); 
          this.user = data.filter(uniqueUser => uniqueUser.id == this.cars[iCar].owner).map(name => name.userName);
        }
      });
    });
    this.validations('button', 'profilePicture');
  }

  validations(evt, validation) {
    let tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(validation).style.display = "block";
    evt.currentTarget.className += " active";
  } 

  
  validateProfilePicture(id: number) {

    var sysDate = new Date();

    this.newFormUser[0].facePhotoValidatedAt = sysDate;

    this.dataService.updateUser(id, this.newFormUser[0]).subscribe(data => {
      
    },
    (err : HttpErrorResponse) => {
      alert(err.status + " : " + err.message);
    });    
  }

  refuseProfilePicture() {

  }

  validateIdCard(id: number) {

    var sysDate = new Date();

    this.newFormUser[0].facePhotoValidatedAt = sysDate;

    this.dataService.updateUser(id, this.newFormUser[0]).subscribe(data => {
      
    },
    (err : HttpErrorResponse) => {
      alert(err.status + " : " + err.message);
    });    
  }

  refuseIdCard() {

  }

  validaVehicle(id: number) {

    var sysDate = new Date();

    this.newFormUser[0].facePhotoValidatedAt = sysDate;

    this.dataService.updateUser(id, this.newFormUser[0]).subscribe(data => {
      
    },
    (err : HttpErrorResponse) => {
      alert(err.status + " : " + err.message);
    });    
  }

  refuseVehicle() {

  }
}
