import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfoud',
  templateUrl: './notfoud.component.html',
  styleUrls: ['./notfoud.component.scss']
})
export class NotfoudComponent implements OnInit {

  constructor(
    private routes : Router ,
  ) { }

  ngOnInit() {}


  back () {
  this.routes.navigate(['dashboard'])
  }

}
