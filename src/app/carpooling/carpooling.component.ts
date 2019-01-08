import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Carpooling } from './carpoolingModel';

@Component({
  selector: 'app-carpooling',
  templateUrl: './carpooling.component.html',
  styleUrls: ['./carpooling.component.css']
})
export class CarpoolingComponent implements OnInit {

  carpooling: Carpooling[];
  newCarpooling: any;

  constructor(private data: DataService) { }

  ngOnInit() { }

  getCarpooling(value: Date) {

    alert(value);

    this.data.getCarpooling().subscribe((car : Carpooling[]) =>  {  
      
      this.carpooling = car;
      //var dateSystem = new Date().getDate();
      for(var carCount = 0; carCount < car.length; carCount++) {
        
        if(car[carCount].createdAt >= value) {

          this.newCarpooling.push(car[carCount].createdAt);
          
        }
      }
    });
    /*if(this.newCarpooling == null) {
      alert("No carpooling in the data base");
    }*/
  }
}
