import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
  
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  title: string;

  constructor(private data: DataService) { }

  ngOnInit() {    
    this.sideBar("dashboard");
  }

  sideBar(id) {

    this.data.changeTitle(id);

    let sidebar = document.getElementsByTagName('a');
    for(let elem = 0; elem < sidebar.length; elem++) {
      sidebar[elem].style.color = "black";
    }
    document.getElementById(id).style.color = "rgb(10, 45, 150)";
  }
}
