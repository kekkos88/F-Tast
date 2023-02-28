import { Component, OnInit } from '@angular/core';
import { SharingService } from '../sharing.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  sidenavContent:string = '';
  elem: HTMLElement | null | undefined;
  show:boolean =true;
  constructor(public shared:SharingService) {
  }
  
  ngOnInit(): void {
   this.shared.setShowTrue();
   console.log("sono in home "+this.shared.show);
  // this.elem = document.getElementById('navigazione');
  // this.elem!.style.display = 'block';
  }
 

}
