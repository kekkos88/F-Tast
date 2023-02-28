import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { AggiungiPazienteService } from '../aggiungi-paziente.service';

@Component({
  selector: 'app-aggiungi-paziente',
  templateUrl: './aggiungi-paziente.component.html',
  styleUrls: ['./aggiungi-paziente.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class AggiungiPazienteComponent implements OnInit {

  localStorage!: Storage;
  validForm: boolean = false;

  aggiungiPazienteForm = this.formBuilder.group({
    id_paziente: new FormControl('', [Validators.required])
  })

  constructor(private rotuer: Router, private addPazienteService: AggiungiPazienteService, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }
  
  checkValidForm() {
    var obj = this.aggiungiPazienteForm.value
    for (var key in obj) {
      var value = obj[key];
      if (value != "") {
        console.log("if");
        console.log(value);
        this.validForm = true;
        return;
      }
    }
    this.validForm = false;
  }

  callingFunction(){
    console.log("STAMPO ID_NUTRIZIONISTA");
    console.log(localStorage.getItem("id_nutrizionista")!);
    console.log(this.aggiungiPazienteForm.value);

    this.checkValidForm();

    if(this.validForm){
      this.addPazienteService.aggiungiPaziente(localStorage.getItem("id_nutrizionista")!, this.aggiungiPazienteForm.value.id_paziente)
      .subscribe((res:any) => {
        console.log(res);
        if(res.esito_aggiunta_paziente === "successo"){
          window.location.reload();
        }else{
          alert(res.esito_aggiunta_paziente);
        }
      })
    }else{alert("Inserisci un codice paziente!"); console.log("NON FACCIO LA CHIAMATA");}
  }
}
