import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { DataService } from '../data.service';
import * as CanvasJS from '../../canvasjs.min';
import { User } from '../users/userModel';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

	users: Object;
	
	women: number = 0;
	men: number = 0;

	totalCarpooling: number = 0;

	userMonthCreatedAt: number = 0;
	carpoolingThisMonth: number = 0;


	constructor(private data: DataService) { }

  	ngOnInit() {

		this.data.getUsers().subscribe(
			data => this.users = data
		);
	  	
			//TODO
		this.data.getUsers().subscribe((userStat: User[]) => {
			
			for(var userCount = 0; userCount < userStat.length; userCount++) {
				var sysMonth = new Date().getMonth();
				
				var userCreatedMonth: Date = new Date(userStat[userCount].createdAt);
				
				if(userCreatedMonth.getMonth() == sysMonth) {
					this.userMonthCreatedAt++;
				}

				//for(var carpoolingCount = 0; carpoolingCount < userStat[carpoolingCount])
			}

			for(let i = 0; i < userStat.length; i++) {
				if(userStat[i].gender == 'f') {
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
    }
}