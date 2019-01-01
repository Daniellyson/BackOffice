import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})

export class TopPageComponent implements OnInit {

  title: string;

  constructor(private data: DataService){ }

  ngOnInit() {
    this.data.currentTitle.subscribe(title => this.title = title);
  }

  getTitle() {
    return this.title.toUpperCase();
  }
}
