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

  cars: Car[];
  vehicle: any[];
  
  user: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCar().subscribe((data : Car[]) => { 
      this.cars = data;

      this.dataService.getUsers().subscribe((data : User[]) => {

        for(var iCar = 0; iCar < this.cars.length; iCar++) {
          for(var iUser = 0; iUser < data.length && data[iUser].id != this.cars[iCar].owner; iUser++) {  }

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

  validatePictures() {
    
  }

  refusePictures() {

  }
}
