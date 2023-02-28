import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { relativeTimeThreshold } from 'moment';
import { pasto, Paziente } from './modelli';
import { TabsRoutingModule } from './tabs-routing/tabs-routing.module';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  nomeGrafico: string="";

  paziente!: Paziente;

  pasto!: pasto;

  pastoCopiato!:pasto;

  //serve per nascondere il menù quando siamo in login
  show:boolean=true;

  disableModificaButton: Boolean = true;

  constructor() { }

  setShowTrue(){
    this.show=true;
  }

  setShowFalse(){
    this.show=false;
  }

  setNome(nome:string){
    this.nomeGrafico=nome;
  }
  getNome(){
    return this.nomeGrafico;
  }

  setPaziente(data: Paziente){
    localStorage.setItem('paziente', JSON.stringify(data));
    //this.paziente=data;
  }

  getPaziente(): Paziente{
    return this.paziente = JSON.parse(localStorage.getItem('paziente')!);
    
  }

  setPasto(pasto: pasto){
    this.pasto = pasto;
  }

  getPasto(): pasto{
    return this.pasto;
  }

  //pastio copiato
  setPastoCopiato(pastoCopiato: pasto){
    this.pastoCopiato = pastoCopiato;
  }

  getPastoCopiato(): pasto{
    return this.pastoCopiato;
  }

  checkPastoCopiato(): boolean{
    console.log("lunghezza pasto "+this.pasto);
    return this.pastoCopiato == undefined;
  }
  //

  setDisableButtonsFalse(){
    this.disableModificaButton=false;
  }

  getDisableButtons(){
    return this.disableModificaButton;
  }

}
