import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Carpooling, Carpoolings } from './carpoolingModel';
import { User } from '../users/userModel';

@Component({
  selector: 'app-carpooling',
  templateUrl: './carpooling.component.html',
  styleUrls: ['./carpooling.component.css']
})
export class CarpoolingComponent implements OnInit {

  users: User[];
  carpooling: Carpooling[];
  newCarpooling: Carpoolings[];
  userName: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    //TODO delete
		alert(localStorage.getItem("userToken"));
    
    //TODO paging
    this.dataService.getUsers().subscribe((data: User[]) => {
      this.users = data;

      this.dataService.getCarpooling().subscribe((car : Carpooling[]) => {       
        this.newCarpooling = car;
        this.carpooling = car;

        for(var carCount = 0; carCount < this.newCarpooling.length; carCount++) {

          this.userName = this.users.filter(user => user.id == this.carpooling[carCount].creator).map(user => user.userName);
          
          this.newCarpooling[carCount].userName = this.userName;            
        }
      });
    });
  }
}
