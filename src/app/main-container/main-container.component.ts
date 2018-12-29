import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as CanvasJS from '../../canvasjs.min';
import { User } from '../users/model';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  users: Object;
	todos: User[];

	women: number = 0;
	men: number = 0;

	constructor(private data: DataService) { }

  ngOnInit() {

    this.data.getUsers().subscribe(
      data => this.users = data
		);
		
    this.data.getTodos().subscribe(
      (todos: User[]) => {

				for(let i = 0; i < todos.length; i++) {
					if(todos[i].completed) {
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