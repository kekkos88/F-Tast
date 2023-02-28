import { Component, OnInit } from '@angular/core';
import { Paziente } from '../modelli';
import { SharingService } from '../sharing.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ModificaPazienteService } from '../modifica-paziente.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-modifica-paziente',
  templateUrl: './modifica-paziente.component.html',
  styleUrls: ['./modifica-paziente.component.css']
})
export class ModificaPazienteComponent implements OnInit {
  //Roba per definire il calendario
  startDate = new Date(1990, 0, 1);
  currentDate = function() { return (new Date).getDate; };

  /*Quando passi dalla schermata di dettaglio paziente a questo component (ModificaPaziente)
  ti passi l'oggetto paziente che contiene le informazioni che tu devi modificare e quindi
  le metti in paziente dichiarato quì. Tutto questo, mediante il service sharing che ha un get e un set*/
  paziente!: Paziente;

  id_paziente!: string;

  sessoInput: any;

  parametri: any[] = [];

  listPatologie: string[] = []; //Lista che dovrebbe contenere tutte le patologie del paziente
  listIntolleranze: string[] = []; //Lista che dovrebbe contenere tutte le intolleranze
  listAllergie: string [] = []; //Lista che dovrebbe contenere tutte le allergie

  constructor(private shared: SharingService, private modificaPaziente: ModificaPazienteService, private router: Router,private aler:AlertService) { }

  ngOnInit(): void {
    //popolo l'oggetto paziente dal service che si occupa dello sharing
    this.paziente = this.shared.getPaziente();
    
    this.id_paziente = this.paziente.dettagli.id_paziente;

    this.precompilaCampi();

    console.log("STAMPO L'ARRAYPARAMETRI PRIMA");
    console.log(this.parametri);

    console.log("STAMPO QUELLO CHE C'E' NELLA ROBA LOCALE");
    console.log(this.sessoInput);
    console.log(this.listPatologie);
    console.log(this.listIntolleranze);
    console.log(this.listAllergie);
    
  }

  addOnBlur = true;
  readonly separatorKeysCodesPatologie = [ENTER, COMMA] as const;
  readonly separatorKeysCodesIntolleranze = [ENTER, COMMA] as const;
  readonly separatorKeysCodesAllergie = [ENTER, COMMA] as const;

  //INIZIO LISTA PATOLOGIE
  addPatologia(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Aggiungiamo la patologia
    if (value) {
      this.listPatologie.push(value);
    }

    // Rimuoviamo la patologia
    event.chipInput!.clear();
  }

  removePatologia(patologia: string): void {
    const index = this.listPatologie.indexOf(patologia);

    if (index >= 0) {
      this.listPatologie.splice(index, 1);
    }
  }
  //FINE LISTA PATOLOGIE


  //INIZIO FINE INTOLLERANZA E ALLERGIE
  addIntolleranza(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Aggiungiamo l'intolleranza
    if (value) {
      this.listIntolleranze.push(value);
    }

    // Rimuoviamo l'intolleranza
    event.chipInput!.clear();
  }

  removeIntolleranza(intolleranza: string): void {
    const index = this.listIntolleranze.indexOf(intolleranza);

    if (index >= 0) {
      this.listIntolleranze.splice(index, 1);
    }
  }
  //FINE INTOLLERANZA


  //INIZIO ALLERGIE
  addAllergia(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    //Aggiungiamo l'allergia
    if(value){
      this.listAllergie.push(value);
      //Rimuoviamo l'allergia
      event.chipInput!.clear();
    }
  }

  removeAllergia(allergia: string): void {
    const index = this.listAllergie.indexOf(allergia);

    if(index >= 0){
      this.listAllergie.splice(index, 1);
    }
  }
  //FINE ALLERGIE

  stampa(){
    console.log(this.listIntolleranze);
    console.log(this.listPatologie);
    console.log(this.listAllergie);
    console.log(this.sessoInput);
  }

  precompilaCampi(){
    this.sessoInput = this.paziente.dettagli.sesso;
    this.listPatologie = JSON.parse(JSON.stringify(this.paziente.dettagli.patologie));
    this.listIntolleranze = JSON.parse(JSON.stringify(this.paziente.dettagli.intolleranze));
    this.listAllergie = JSON.parse(JSON.stringify(this.paziente.dettagli.allergie));
  }

  modificaInfoPaziente(){
    
    console.log("AGGIORNA ARRAY FUNC")

    this.aggiornaArray();

    console.log("STAMPO L'ARRAYPARAMETRI DOPO");
    console.log(this.parametri);


    /*console.log(this.listPatologie);
    console.log(this.paziente.dettagli.patologie);
    console.log(this.listPatologie === this.paziente.dettagli.patologie);*/

    /*this.parametri[0].value = this.sessoInput;
    this.parametri[1].value = this.listAllergie;
    this.parametri[2].value = this.listPatologie;
    this.parametri[3].value = this.listIntolleranze;*/

    this.modificaPaziente.modificaInfoPaziente(this.parametri, localStorage.getItem("id_nutrizionista")!).subscribe((res: any) => {
      console.log(res);
      this.aler.avvisoOk('Modifiche al paziente effettuate!');
      //this.router.navigate(['/pazienti']);
    });
  }

  aggiornaArray() {

    if(this.sessoInput !== this.paziente.dettagli.sesso){
      console.log("ho cambiato sesso");
      this.parametri.push({key: "sesso", value: this.sessoInput});
    }else{console.log("NON ho cambiato sesso");}

    if(JSON.stringify(this.listPatologie) !== JSON.stringify(this.paziente.dettagli.patologie)){
      console.log("ho cambiato patologie");
      this.parametri.push({key: "patologie", value: this.listPatologie});
    }else{console.log("NON ho cambiato Patologie");}

    if(JSON.stringify(this.listAllergie) !== JSON.stringify(this.paziente.dettagli.allergie)){
      console.log("ho cambiato allergie");
      this.parametri.push({key: "allergie", value: this.listAllergie});
    }else{console.log("NON ho cambiato Allergie");}

    if(JSON.stringify(this.listIntolleranze) !== JSON.stringify(this.paziente.dettagli.intolleranze)){
      console.log("ho cambiato intolleranze");
      this.parametri.push({key: "intolleranze", value: this.listIntolleranze});
    }else{console.log("NON ho cambiato Intoleranze");}

  }

}
