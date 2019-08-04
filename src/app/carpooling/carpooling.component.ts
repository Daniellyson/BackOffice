import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Carpooling, Car } from './carpoolingModel';
import { User } from '../users/userModel';
import { getCreationMode } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-carpooling',
  templateUrl: './carpooling.component.html',
  styleUrls: ['./carpooling.component.css']
})
export class CarpoolingComponent implements OnInit {

  carpooling: Carpooling[];
  car: Car;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    //TODO delete
		alert(localStorage.getItem("userToken"));

    this.dataService.getCarpooling().subscribe((carpooling : Carpooling[]) => {       
      this.carpooling = carpooling;
      for(var iCar = 0; iCar < this.carpooling.length; iCar++) {
        this.getCar(iCar);
      }
    });
  }

  getCar(index: number) {
    this.dataService.getCarById(this.carpooling[index].car).subscribe((car : Car) => {
      this.car = car;
      this.getUser(this.car.owner, index);
      this.carpooling[index].carModel = car.carModel;
    });
  }

  getUser(id: string, index: number) {
    this.dataService.getUserById(id).subscribe((user : User) => {
      this.carpooling[index].userName = user.userName;
    });
  }
}
