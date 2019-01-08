import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { DataService } from '../data.service';
import * as CanvasJS from '../../canvasjs.min';
import { User } from '../users/userModel';
import { DatePipe, formatDate } from '@angular/common';
import { Carpooling } from '../carpooling/carpoolingModel';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

	users: User[];
	
	women: number = 0;
	men: number = 0;

	totalCarpooling: number = 0;

	userMonthCreatedAt: number = 0;
	carpoolingThisMonth: number = 0;


	constructor(private data: DataService) { }

  	ngOnInit() {

		this.data.getCarpooling().subscribe((car: Carpooling[]) => {
			
			for(var iCar = 0; iCar < car.length; iCar++) {
				var sysMonth = new Date().getMonth();
				
				var carpoolingCreatedMonth: Date = new Date(car[iCar].createdAt);
				
				if(carpoolingCreatedMonth.getMonth() == sysMonth) {
					this.carpoolingThisMonth++;
				}

				this.totalCarpooling++;
			}

			this.data.getUsers().subscribe(
				(data: User[]) => { 
					
				this.users = data;

				for(var iUser = 0; iUser < this.users.length; iUser++) {
					var sysMonth = new Date().getMonth();
					
					var userCreatedMonth: Date = new Date(this.users[iUser].createdAt);
					
					if(userCreatedMonth.getMonth() == sysMonth) {
						this.userMonthCreatedAt++;
					}
				}

				for(let i = 0; i < this.users.length; i++) {
					if(this.users[i].gender == 'f') {
						this.women++;
					} 
					else {
						this.men++;
					}
				}
	
				let chart = new CanvasJS.Chart("chartContainer", {
					animationEnabled: true,
					exportEnabled: false,
					title: {
						text: "Gender division in data base"
					},
					data: [{
						type: "column",
						dataPoints: [
							{"y": this.women, label: "Women"}, 
							{"y": this.men, label: "Men"},
						]
					}]
				});
		
				chart.render();
			});
	  	});

			
    }
}