import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { async, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AlertService } from '../alert.service';

import { alimento, itemListaAlimento, Paziente, pasto } from '../modelli';
import { PianoGiornalieroService } from '../piano-giornaliero.service';
import { SharingService } from '../sharing.service';


@Component({
  selector: 'app-pasto',
  templateUrl: './pasto.component.html',
  styleUrls: ['./pasto.component.css']
})
export class PastoComponent implements OnInit {

  @Input() pasto!: pasto;
  inserisciPasto = this.formBuilder.group({
    giornoInCuiClonarePasto: new FormControl(''),
    nomeAlimento: new FormControl('', [Validators.required]),
    quantitaAlimento: new FormControl('', [Validators.required]),
    unitaDiMisura: new FormControl('', [Validators.required]),
    note: new FormControl()
  });

  constructor(private alert:AlertService ,private shared: SharingService, private formBuilder: FormBuilder, private pianoGiornalieroService: PianoGiornalieroService) {
    this.localStorage = window.localStorage;
  }

  giorno: string[] = ["Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"];

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  paziente!: Paziente;
  unitaDiMisura: string[] = ['mL', 'gr'];
  id_paziente!: string;

  activateButton: boolean = true;

  ricercaAlimento!: any;
  parola!: string;

  lista_intolleranze:string[]=[];
  intolleranza:string="";
  allergene:string="";
  intolleranza2 :Promise<boolean> | undefined;

  //ELEMENTI CHE COSTITUISCONO IL PASTO
  dataBaseAlimenti!: alimento[];
  pastoPresenteInService: boolean = true;
  localStorage!: Storage;

  ngOnInit(): void {

    this.filteredOptions = this.inserisciPasto.get('nomeAlimento')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.paziente = this.shared.getPaziente();
    //console.log("paziente "+this.paziente.dettagli.id_paziente);
    this.id_paziente = this.paziente.dettagli.id_paziente;
   // console.log("dieta in ngoninit");
    this.getAlimenti();
   // console.log(this.pasto.listaAlimenti.length);
  }

  _keyUp(event: any) {
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46, 190];
    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getAlimenti() {
    //console.log("sono in get alimenti ");
    this.pianoGiornalieroService.getAlimentiDaServer().subscribe((data: any) => {
      this.dataBaseAlimenti = data.alimenti;
      console.log("sono in get alimenti 1");
      for (let i = 0; i < this.dataBaseAlimenti.length; i++) {
        this.options.push(this.dataBaseAlimenti[i].alimento);
      }
      console.log("sono in get alimenti 2");
    })
  }

  setNotaPasto() {
    if ((this.inserisciPasto.value.nomeAlimento != "" && this.inserisciPasto.value.quantitaAlimento != "" && this.inserisciPasto.value.unitaDiMisura != "")) {
      if (this.inserisciPasto.value.note != null) {
        this.pasto.note[0] = "" + this.inserisciPasto.value.note;
      } else {
        this.pasto.note[0] = "";
      }
    }
  }

  setAlimento(nomeAlimento: string, quantitaAlimento: string, unitaDiMisura: string, codice: number): itemListaAlimento {
    var alimento: itemListaAlimento = { nome_alimento: "", codice_alimento: 0, unita_misura: "", quantita: "" };

    alimento.nome_alimento = nomeAlimento;
    alimento.quantita = quantitaAlimento;
    alimento.unita_misura = unitaDiMisura;
    alimento.codice_alimento = codice;

    return alimento;
  }

  costruisciPasto() {
    this.inserisciAlimento();
    this.setNotaPasto();
    this.shared.setPasto(this.pasto);
  }

   async inserisciAlimento() {

    var i = 0; var alimento: itemListaAlimento;

    if ((this.inserisciPasto.value.nomeAlimento != "" && this.inserisciPasto.value.quantitaAlimento != "" && this.inserisciPasto.value.unitaDiMisura != "")) {
      console.log("SONO ENTRATO");

      for (i; i < this.dataBaseAlimenti.length; i++) {
        if (this.inserisciPasto.value.nomeAlimento == this.dataBaseAlimenti[i].alimento) {

          alimento = this.setAlimento(this.inserisciPasto.value.nomeAlimento, this.inserisciPasto.value.quantitaAlimento,
          this.inserisciPasto.value.unitaDiMisura, this.dataBaseAlimenti[i].codice);
          this.pasto.listaAlimenti.push(alimento);
          return;
        }
      }

      if (i >= this.dataBaseAlimenti.length) {
        alimento = this.setAlimento(this.inserisciPasto.value.nomeAlimento, this.inserisciPasto.value.quantitaAlimento,
          this.inserisciPasto.value.unitaDiMisura, -1);
        this.pasto.listaAlimenti.push(alimento);
        
      }
      
    }else{
      this.alert.avvisoOk("Alimento non aggiunto ,controlla i campi in rosso!");
    }
  }

  copiaPasto() {
    
    for (var i = 0; i < this.pasto.listaAlimenti.length; i++){
      console.log("nome pasto "+this.pasto.listaAlimenti[i].nome_alimento );
    }

    this.shared.setPastoCopiato(this.pasto);
    this.alert.avvisoOk("Pasto copiato!");
  }

  //controllo se uno o più alimenti sono già presenti nel pasto
  controlloIncollaPasto(): boolean{
    var pastoCopiato!: pasto;
    pastoCopiato = this.shared.getPastoCopiato();
    var contaAlimenti =0;
    var alimenti=[];
    for (var i = 0; i < pastoCopiato.listaAlimenti.length; i++){
        if(this.pasto.listaAlimenti.includes(pastoCopiato.listaAlimenti[i])){
          console.log("il pasto include l'alimento "+pastoCopiato.listaAlimenti[i]);
          contaAlimenti++;
          alimenti.push(pastoCopiato.listaAlimenti[i].nome_alimento);
        }
    }
    if(contaAlimenti > 0){
      this.alert.avvisoOk("Uno o più alimenti sono già contenuti nel pasto! "+alimenti.toString());
      return false;
    }
    return true;
  }

  incollaPasto() {
    if (!this.shared.checkPastoCopiato()) {
        var pastoCopiato!: pasto;
        pastoCopiato = this.shared.getPastoCopiato();
        console.log("lunghezza "+pastoCopiato.listaAlimenti.length);
        //evito il crash quando si incolla il pasto nella stessa sezione
     if( this.controlloIncollaPasto()){

        for (var i = 0; i < pastoCopiato.listaAlimenti.length; i++) {
          this.pasto.listaAlimenti.push(pastoCopiato.listaAlimenti[i]);
        }
        this.pasto.note[0] = pastoCopiato.note[0];
      }

    } else { 
      this.alert.avvisoOk("Non hai copiato il pasto!"); 
    }
  }

  rimuoviAlimento(alimento: itemListaAlimento) {
    console.log(this.pasto.listaAlimenti.indexOf(alimento), 0);
    if (this.pasto.listaAlimenti.indexOf(alimento) > -1) {
      this.pasto.listaAlimenti.splice(this.pasto.listaAlimenti.indexOf(alimento), 1);
    }
    this.pasto.listaAlimenti[this.pasto.listaAlimenti.indexOf(alimento)];
  }
}
