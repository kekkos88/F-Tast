import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { MisurazioniService } from '../misurazioni.service';
import { Paziente } from '../modelli';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-misurazioni',
  templateUrl: './misurazioni.component.html',
  styleUrls: ['./misurazioni.component.css'],
  providers: [DatePipe]
})
export class MisurazioniComponent implements OnInit {

  aggiungiMisurazioneForm = this.formBuilder.group({
    peso: new FormControl(''),
    menopausa: new FormControl(''),
    massaGrassa: new FormControl(''),
    massaMagra: new FormControl(''),
    idratazione: new FormControl(''),
    altezza: new FormControl(''),
    diametroVita: new FormControl(''),
    diametroFianchi: new FormControl(''),
    bmi: new FormControl(''),
    colesteroloDHL: new FormControl(''),
    trigliceridi: new FormControl(''),
    glucosio: new FormControl(''),
    sistole: new FormControl(''),
    diastole: new FormControl(''),
  })

  paziente!: Paziente;

  parametri_misurazione: any[] = [];
  id_paziente :string="";
  localStorage!: Storage;

  myDate = new Date();
  currentDate!: any;
  currentDatePagina!: any;

  isValue: boolean = false;

  constructor(private alert:AlertService,private shared: SharingService, private misurazioni: MisurazioniService, private datePipe: DatePipe, private formBuilder: FormBuilder) {
    this.currentDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh-mm-ss');
  }

  ngOnInit(): void {
    this.paziente = this.shared.getPaziente();
    console.log(this.paziente.dettagli.id_paziente);
    console.log(localStorage.getItem("id_nutrizionista")!);
    console.log(this.currentDate);
    this.id_paziente=this.paziente.dettagli.id_paziente;
    this.currentDatePagina=this.datePipe.transform(this.myDate, 'dd-MM-yyyy');

   

  }

  checkValidForm() {
    var obj = this.aggiungiMisurazioneForm.value
    for (var key in obj) {
      var value = obj[key];
      if (value != "") {
        console.log("if");
        console.log(value);
        this.isValue = true;
        return;
      }
    }
    this.isValue = false;
  }

  callingFunction() {
    console.log(this.aggiungiMisurazioneForm.valueChanges);
    console.log(this.aggiungiMisurazioneForm.value);

    this.checkValidForm()
    console.log("Dentro check");
    
    if(this.isValue) {
      this.misurazioni.salvaMisurazione(localStorage.getItem("id_nutrizionista")!, this.paziente.dettagli.id_paziente,
      this.aggiungiMisurazioneForm.value, this.currentDate).subscribe((res: any) => {
        if(res.esito_aggiunta_misurazione == "successo"){
          console.log("esito: "+res.esito_aggiunta_misurazione);
          this.alert.avvisoOk("Misurazione aggiunta con successo!");
        }else{
          this.alert.avvisoOk("Attenzione: " + res.esito_aggiunta_misurazione);
        }
        console.log(res);
      })
    } else {this.alert.avvisoOk("Inserisci almeno un campo!"); console.log("non FACCIO LA CHIAMATA") }

    //this.router.navigate(['/pazienti']);
    
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
}
