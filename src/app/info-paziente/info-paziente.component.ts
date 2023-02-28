import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {  Paziente } from '../modelli';
import { SharingService } from '../sharing.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { PazientiService } from '../pazienti.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-info-paziente',
  templateUrl: './info-paziente.component.html',
  styleUrls: ['./info-paziente.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class InfoPazienteComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<InfoPazienteComponent>,
    @Inject(MAT_DIALOG_DATA)  private pazientiService: PazientiService,private shared: SharingService,) { }

  paziente!: Paziente;

  id_paziente!: string;

  sessoInput: any;

  parametri: any[] = [];

  listPatologie: string[] = []; //Lista che dovrebbe contenere tutte le patologie del paziente
  listIntolleranze: string[] = []; //Lista che dovrebbe contenere tutte le intolleranze
  listAllergie: string [] = []; //Lista che dovrebbe contenere tutte le allergie


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

  esci(){
    this.dialogRef.close();
  }

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
  precompilaCampi(){
    this.sessoInput = this.paziente.dettagli.sesso;
    this.listPatologie = JSON.parse(JSON.stringify(this.paziente.dettagli.patologie));
    this.listIntolleranze = JSON.parse(JSON.stringify(this.paziente.dettagli.intolleranze));
    this.listAllergie = JSON.parse(JSON.stringify(this.paziente.dettagli.allergie));
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
