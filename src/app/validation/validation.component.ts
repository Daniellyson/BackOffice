import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Car, Cars } from './carModel';
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

  pictures: User[];
  cars: Car[];  
  user: any;
  updateCar: Cars[];
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

          this.cars[iCar].ownerName = this.user;
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

  validatePictures(id: string, index: number, callFrom: string) {
    var sysDate = new Date();

    if(callFrom == "face") {
      this.pictures[index].facePhotoValidatedAt =  sysDate;
    }

    if (callFrom == "idCard") {
      this.pictures[index].identityPieceValidatedAt =  sysDate;
    }

    this.updateUserPhotos(id, index, callFrom);
  }

  refusePictures(id: string, index: number, callFrom: string) {
    if(callFrom == "face") {
      this.pictures[index].facePhotoFilename = null;
      this.pictures[index].facePhotoSentAt = null;
    }

    if (callFrom == "idCard") {
      this.pictures[index].identityPieceFilename = null;
      this.pictures[index].identityPieceSentAt = null;
    }

    this.updateUserPhotos(id, index, callFrom);
  }

  updateUserPhotos(id: string, index: number, callFrom: string) {
    this.dataService.updateUser(id, this.pictures[index]).subscribe(data => {
      this.pictures = this.pictures.filter(u => u !== data);
      this.ngOnInit();
      this. validations('button', callFrom);
    },
    (err : HttpErrorResponse) => {
      alert(err.status + " : " + err.message);
    });
  }

  validaVehicle(id: number, index: number) {

    this.dataService.getCar().subscribe((data: Cars[]) => {
      this.updateCar = data;

      var sysDate = new Date();

      this.updateCar[index].validatedAt = sysDate;

      alert( this.updateCar[index].validatedAt)

      this.dataService.updateCar(id, this.updateCar[index]).subscribe(data => {
        this.ngOnInit();
        this. validations('button', 'vehicle');
      },
      (err : HttpErrorResponse) => {
        alert(err.status + " : " + err.message);
      });
    }); 
  }

  refuseVehicle(id: number) {

    this.dataService.deleteCar(id).subscribe(data => {
      this.cars = this.cars.filter(u => u !== data);
      this.ngOnInit();
      this. validations('button', 'vehicle');
    },
    (err : HttpErrorResponse) => {
      alert(err.status + " : " + err.message);
    });
  }
}