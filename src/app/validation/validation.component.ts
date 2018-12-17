import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  pictures$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getPictureValidation().subscribe(
      data => this.pictures$ = data
    )

    this.validations('button', 'profilePicture');
  }

  validations(evt, validation) {

    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(validation).style.display = "block";
    evt.currentTarget.className += " active";
  } 

}
