import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-carpooling',
  templateUrl: './carpooling.component.html',
  styleUrls: ['./carpooling.component.css']
})
export class CarpoolingComponent implements OnInit {

  carpooling$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getCarpooling().subscribe(
      data => this.carpooling$ = data
    )
  }

}
