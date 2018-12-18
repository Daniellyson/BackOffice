import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

}
