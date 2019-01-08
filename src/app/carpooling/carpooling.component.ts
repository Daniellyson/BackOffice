import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Carpooling } from './carpoolingModel';
import { User } from '../users/userModel';

@Component({
  selector: 'app-carpooling',
  templateUrl: './carpooling.component.html',
  styleUrls: ['./carpooling.component.css']
})
export class CarpoolingComponent implements OnInit {

  users: User[];
  user: any;
  carpooling: Carpooling[];
  newCarpooling: Carpooling[];
  userName: string;

  constructor(private dataService: DataService) { }

  ngOnInit() { }

  getCarpooling(value: Date) {
    this.dataService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });

    this.dataService.getCarpooling().subscribe((car : Carpooling[]) =>  {  
      
      this.carpooling = car;
      //var dateSystem = new Date().getDate();

      for(var carCount = 0; carCount < car.length; carCount++) {
        for(var iUser = 0; iUser < this.users.length && this.users[iUser].id != this.carpooling[carCount].creator; iUser++) {  }

         //this.userName = this.carpooling.filter(car => car.creator == this.users[iUser].id).map(user => this.users[iUser].userName);
        
        if(this.carpooling[carCount].createdAt >= value) {
          this.newCarpooling[carCount].userName = this.users[iUser].userName;
          this.newCarpooling[carCount].createdAt = this.carpooling[carCount].createdAt;
        }
      }
    });
    /*if(this.newCarpooling == null) {
      alert("No carpooling in the data base");
    }*/
  }
}
