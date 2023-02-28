import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PazientiComponent } from '../pazienti/pazienti.component';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  sidenavContent:string = '';

  
  constructor(public router: Router, public shared:SharingService) {

   }

  ngOnInit(): void {
    console.log("sono in home-page");
  }
  
  

}
