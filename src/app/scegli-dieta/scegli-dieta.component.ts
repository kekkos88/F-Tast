import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Paziente } from '../modelli';
import { PazientiService } from '../pazienti.service';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-scegli-dieta',
  templateUrl: './scegli-dieta.component.html',
  styleUrls: ['./scegli-dieta.component.css']
})
export class ScegliDietaComponent implements OnInit {

  currentDate!: any;
  myDate = new Date();

  constructor(public dialogRef: MatDialogRef<ScegliDietaComponent>, 
    @Inject(MAT_DIALOG_DATA) public paziente: Paziente, private shared: SharingService, 
    private pazientiService: PazientiService, private router: Router)
    {
      this.currentDate = formatDate(this.myDate,'yyyy-MM-dd hh:mm:ss','en');
    }

  ngOnInit(): void {
  }

  sendPaziente(){
    this.shared.setPaziente(this.paziente);
  }

  aggiungiNuovaDieta(){
    if(this.paziente.dettagli.dieta == "presente"){
      this.pazientiService.nuovaDieta(this.paziente.dettagli.id_paziente, 
        localStorage.getItem("id_nutrizionista")!, 
        this.currentDate).subscribe((data:any) => {
        console.log("SONO NELLA FUNZIONE aggiungiNuovaDieta");
        console.log(data);
        this.router.navigate(['/dieta']);
        this.sendPaziente();
        this.dialogRef.close();
      })
    }

  }

  modificaDietaEsistente(){
    this.router.navigate(['/dieta']);
    this.sendPaziente();
    this.dialogRef.close();
  }
}
