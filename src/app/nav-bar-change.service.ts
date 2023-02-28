import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
//import { link } from 'fs';
import { Subject } from 'rxjs';


interface node {
  link: string;
  icon: string;
}


@Injectable({
  providedIn: 'root'
})


export class NavBarChangeService {
  
  constructor() { 
    this.localStorage = window.localStorage;
    this.controlloAttivaNavBar();
  }

  links: node[] = [{link:'Home',icon:'home'},{link:'Pazienti', icon:'groups'},{ link: '.',icon:'edit'},{link:'.', icon:'analytics'},{link:'.',icon:'food_bank'},{link:'.',icon:'book'}];

  id_paziente : string| undefined;

  private navBar = new Subject<node[]>();
  navBarChange$=this.navBar.asObservable();
  localStorage: Storage;

  ngOnInit(): void {
    this.navBarChange$.subscribe(linkIn=>{
    this.links=linkIn;
 
      console.log("sono qui");
  })}

  attivaNavBar(){
    console.log("sono in attiva navBar");
    this.links.splice(2,1,{link:'Modifica',icon:'edit'}); 
    this.links.splice(3,1,{link:'Misurazioni',icon:'analytics'});
    this.links.splice(4,1,{link:'Dieta',icon:'food_bank'});
    this.links.splice(5,1,{link:'Agenda',icon:'book'});
    this.localStorage.setItem('mostraNavBar','true');
  }

  //da fare reset navbar

  controlloAttivaNavBar(){
    console.log("sono in controllo attiva nav bar");
    if(this.localStorage.getItem('mostraNavBar')==null){
       this.localStorage.setItem('mostraNavBar','false');
    }else{
          if( this.localStorage.getItem('mostraNavBar')== 'true'){
            this.attivaNavBar();
          }

    }

  }

  resetNavBar(){
    this.links.splice(2,1,{link:'.',icon:'edit'}); 
    this.links.splice(3,1,{link:'.',icon:'analytics'});
    this.links.splice(4,1,{link:'.',icon:'food_bank'});
    this.links.splice(5,1,{link:'.',icon:'book'});
  }
  
   
  }


