import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Carpooling, Car } from './carpoolingModel';
import { User } from '../users/userModel';

const pageSize: number = 5;

@Component({
  selector: 'app-carpooling',
  templateUrl: './carpooling.component.html',
  styleUrls: ['./carpooling.component.css']
})
export class CarpoolingComponent implements OnInit {

  carpooling: Carpooling[];
  car: Car;

  resultPage: number = 0;
  totalPageUsers: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    //TODO delete alert
    alert(localStorage.getItem("userToken"));

    this.dataService.getCarpooling().subscribe((carpooling : Carpooling[]) => {
      this.totalPageUsers = Math.ceil(carpooling.length/pageSize);
      this.getCarpooling();
    });
  }

  getCarpooling() {
    
    this.dataService.getCarpoolingPagination(this.resultPage).subscribe((carpooling : Carpooling[]) => {       
      this.carpooling = carpooling;
      for(var iCar = 0; iCar < this.carpooling.length; iCar++) {
        this.getCar(iCar);
      }
      this.getCarpoolingOtherPage(this.resultPage);
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

  getCarpoolingOtherPage(value: number) {
    
    this.resultPage += value;
    if(this.resultPage > 0 && this.resultPage < this.totalPageUsers) {
      this.dataService.getCarpoolingPagination(this.resultPage).subscribe(
        (data : Carpooling[]) => this.carpooling = data
      );
    }
  }
}
