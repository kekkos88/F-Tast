import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart } from 'chart.js';
import { DialogData, MisurazionePaziente, Paziente } from '../modelli';
import { PazientiService } from '../pazienti.service';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-visualizza-visita-paziente',
  templateUrl: './visualizza-visita-paziente.component.html',
  styleUrls: ['./visualizza-visita-paziente.component.css']
})


export class VisualizzaVisitaPazienteComponent implements OnInit {
 
  menopausa: string | undefined;
 // disabilitaPulsanteRete: boolean = true;

 

  misurazioneSelezionata: number = 0;
  
  nomeChart :string ="";

  constructor(public dialogRef: MatDialogRef<VisualizzaVisitaPazienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private pazientiService: PazientiService, private shared: SharingService) { }

   //@ViewChild(VisualizzaVisitaPazienteInfoComponent) visualizzaVisitaPazienteinfo!: VisualizzaVisitaPazienteInfoComponent;


    paziente: Paziente | undefined;

  ngOnInit(): void {
    
    this.paziente=this.shared.getPaziente();
    console.log(this.data);

  // this.menopausaSetter();
   /* if(!JSON.stringify(this.data).includes("null")){
      this.disabilitaPulsanteRete = false;
    }
    */
    
    this.cercaMisurazione(this.data.misurazione,this.data.ListaMisurazioni);
    console.log(this.cercaMisurazione(this.data.misurazione,this.data.ListaMisurazioni));
    this.menopausaSetter();
   }

  onClickOk(): void {
    this.dialogRef.close();
  }

  cercaMisurazione(misurazione:MisurazionePaziente,listaPaziente:MisurazionePaziente[]){
  var index=0;
  let i =0;
  let exit =false;
  while( i < this.data.ListaMisurazioni.length && exit==false){
    if(this.data.misurazione.idmisurazione == this.data.ListaMisurazioni[i].idmisurazione){
        index=i;
        exit=true;
    }
    i++;
  }
    this.misurazioneSelezionata=index;
  }

  menopausaSetter(){
    if(this.data.misurazione.menopausa == 1 ){
      this.menopausa = "Si";
    }else{
      this.menopausa = "No";
    }
  }

}
