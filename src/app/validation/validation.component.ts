import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Car, Cars } from './carModel';
import { User } from '../users/userModel';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  pictures: User[];
  cars: Car[];  
  user: any;
  updateCar: Cars[];
  newFormUser: User[];

  atLeastOneCarToBeValidate: number = 0;

  //resultPage: number = 0;
  //totalPageCars: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getCar().subscribe((data : Car[]) => { 
      this.cars = data;
      //this.totalPageCars = Math.ceil(data.length/5);

      this.getUsers();
    });
    this.validations('profilePicture');
  }

  getUsers() {
    this.dataService.getUsers().subscribe((data : User[]) => {

      this.pictures = data;
      this.getCars(data);
    });
  }

  getCars(data : User[]) {
    
    for(var iCar = 0; iCar < this.cars.length; iCar++) {        

      for(var iUser = 0; iUser < data.length && data[iUser].id != this.cars[iCar].owner; iUser++) {  }

      this.newFormUser = data.filter(uniqueUser => uniqueUser.id == this.cars[iCar].owner); 
      this.user = data.filter(uniqueUser => uniqueUser.id == this.cars[iCar].owner).map(name => name.userName);

      this.cars[iCar].ownerName = this.user;
    }
  }

  validations(validation) {
    var tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(validation).style.display = "block";
  } 

  validatePictures(id: string, callFrom: string) {
    if(callFrom == "profilePicture") {
      this.updateFacePhoto(id, true, callFrom);
    }
    if (callFrom == "idCard") {
      this.updateIdCardPhoto(id, true, callFrom);
    }
  }

  refusePictures(id: string, callFrom: string) {
    if(callFrom == "profilePicture") {
      this.updateFacePhoto(id, false, callFrom);
    }
    if (callFrom == "idCard") {
      this.updateIdCardPhoto(id, false, callFrom);
    }
  }

  updateFacePhoto(id: string, isAccepted: boolean, callFrom: string) {
    this.dataService.updateUserFacePhoto(id, isAccepted).subscribe(data => {
      this.ngOnInit();
      this.validations(callFrom);
    },
    (err : HttpErrorResponse) => {
      console.log(err.status + " : " + err.message);
    });
  }

  updateIdCardPhoto(id: string, isAccepted: boolean, callFrom: string) {
    this.dataService.updateUserIdCardPhoto(id, isAccepted).subscribe(data => {
      this.ngOnInit();
      this.validations(callFrom);
    },
    (err : HttpErrorResponse) => {
      console.log(err.status + " : " + err.message);
    });
  }

  validateVehicle(id: number) {   

    this.dataService.updateCar(id, true).subscribe(data => {
      this.ngOnInit();
      this.validations('vehicle');
    },
    (err : HttpErrorResponse) => {
      console.log(err.status + " : " + err.message);
    });
  }

  refuseVehicle(id: number) {

    this.dataService.deleteCar(id).subscribe(data => {
      this.ngOnInit();
      this.validations('vehicle');
    },
    (err : HttpErrorResponse) => {
      console.log(err.status + " : " + err.message);
    });
  }

  /*getCarsOtherPage(value: number) {
    
    this.resultPage += value;
    if(this.resultPage >= 0 && this.resultPage <= this.totalPageCars) {
      console.log(this.atLeastOneCarToBeValidate);
      this.dataService.getCarPagination(this.resultPage).subscribe(
        (data : Car[]) => this.cars = data
      );
    }
  }*/
}