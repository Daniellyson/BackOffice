import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { DataService } from '../data.service';
import * as CanvasJS from '../../canvasjs.min';
import { User } from '../users/model';
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

	userMonthCreatedAt: number = 0;

	constructor(private data: DataService) { }

  ngOnInit() {

    this.data.getUsers().subscribe(
      data => this.users = data
		);
		
    this.data.getUsers().subscribe(
      (userStat: User[]) => {
				
				
				
				for(let i = 0; i < userStat.length; i++) {
					var sysMonth = new Date().getMonth();
					
					var userCreatedMonth: Date = new Date(userStat[i].createdAt);
					
					if(userCreatedMonth.getMonth() == sysMonth) {
						this.userMonthCreatedAt++;
					}
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
			},
		);
	}
}