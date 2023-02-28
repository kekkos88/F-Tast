import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Paziente } from '../modelli';
import { PianoGiornalieroComponent } from '../piano-giornaliero/piano-giornaliero.component';
import { SharingService } from '../sharing.service';
import { NavBarChangeService } from '../nav-bar-change.service';
import { Router } from '@angular/router';
//import { link } from 'fs';
import { AlertService } from '../alert.service';
 
export interface node{
  link: string;
  icon: string;
  //flag: boolean;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  links: node[] =this.navBarChange.links;
  activeLink = 'Home';

  constructor(private share: SharingService, private navBarChange:NavBarChangeService,private router: Router , private alert :AlertService) {
    this.localStorage = window.localStorage;
   }

  paziente!: Paziente;
  observe: any;
  
  localStorage!: Storage;
  
  ok: boolean = true;

  ngOnInit(): void {
      this.navBarChange.navBarChange$.subscribe(linkIn=>{
      this.links=linkIn;
 

    })

  }

  checkLink(linkIn : string){
    if(linkIn=='.'){
       this.alert.avvisoOk("Seleziona un paziente in 'Dettagli paziente' nella sezione 'Pazienti' per sbloccare il Menù");
    }else{
      this.activeLink = linkIn;
    }
  }
  
  async logOut(){
  if(await this.alert.avvisoConConferma("Sei sicuro/a di voler uscire?")){
      console.log("confirm "+confirm);
      this.localStorage.removeItem('refresh_token');
      this.localStorage.removeItem('access_token');
      this.localStorage.removeItem('id_nutrizionista');
      this.localStorage.removeItem('paziente');
      this.localStorage.removeItem('mostraNavBar');
      this.navBarChange.resetNavBar();
      this.router.navigate(['/login']);
  }

  }


}
