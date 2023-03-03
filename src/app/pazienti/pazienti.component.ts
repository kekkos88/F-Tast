import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AggiungiPazienteComponent } from '../aggiungi-paziente/aggiungi-paziente.component';
import { MisurazionePaziente, Paziente } from '../modelli';
import { PazientiService } from '../pazienti.service';
import { SharingService } from '../sharing.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { VisualizzaVisitaPazienteComponent } from '../visualizza-visita-paziente/visualizza-visita-paziente.component';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { GraficiComponent } from '../grafici/grafici.component';
import { Pipe} from '@angular/core';
import {NavBarChangeService } from '../nav-bar-change.service';
import { ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { ScegliDietaComponent } from '../scegli-dieta/scegli-dieta.component';
import { ValueTransformer } from '@angular/compiler/src/util';
import { filter } from 'rxjs';
import { MonthPickerComponent } from '../month-picker/month-picker.component';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Pipe({name:'filter2'}) 
export class FilterPipe {
  transform(value: string[], term: string) {
    if (!term) return value;
    console.log("value "+value+" term "+term);
   return value.filter((item2) => item2.toUpperCase().indexOf(term.toUpperCase()) > -1);
  }
}


@Component({
  
  selector: 'app-pazienti',
  templateUrl: './pazienti.component.html',
  styleUrls: ['./pazienti.component.css'],
  //encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    
  },
  
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },]
  
})

export class PazientiComponent implements OnInit {

  @ViewChild(MonthPickerComponent) datePickerComponent!: MonthPickerComponent;

  date = new FormControl(moment());
  static shared: any;
  static paziente: any;

  // variabili necessarie per la paginazione di Elenco e Dettagli paziente
  indicePaginazione:any;

  // variabile utile per la pipe di ricerca del cliente in base al codice
  searchText :any =""; 
  
  constructor(private grafico:GraficiComponent, private navBarChange:NavBarChangeService, private dialog: MatDialog, private pazientiService: PazientiService, private shared: SharingService, private _bottomSheet: MatBottomSheet, private router: Router, private monthPickerComponent :MonthPickerComponent) { }

  listaPazienti: string[] = [];

  paziente: Paziente | undefined;

  disableModificaButton: Boolean =this.shared.getDisableButtons();

  listMisurazioni: MisurazionePaziente[] = [];
  listMisurazioniConData: MisurazionePaziente[] = [];
  misurazione: MisurazionePaziente | undefined;
  config: any;
  id_nutrizionista: string = "";

  menopausa: string | undefined;
 
  ngOnInit(): void {
   console.log("variabile show "+this.shared.show);
    this.getPazienti();
    
      console.log('sono in pazienti  '+this.disableModificaButton);

      this.paziente = this.shared.getPaziente();

      this.getDettaglio(this.paziente.dettagli.id_paziente);
  }
 

  getDettaglio(paziente: string) {
      console.log("sono in get dettagli "+paziente);
    
      this.indicePaginazione=0;
 
      this.pazientiService.getDettaglioPaziente(paziente, localStorage.getItem("id_nutrizionista")!).subscribe((res: any) => {
      console.log(res);
      this.paziente = res;
     
      this.listMisurazioni = res.dettagli.storico_misurazioni;
      //console.log("STAMPO LISTMISURAZIONI " + this.listMisurazioni);

      this.navBarChange.attivaNavBar();
    
      this.adattaOrarioMisurazione();
      
      this.menopausaSetter();

      //ordino le misurazioni in base all'Id  
      this.listMisurazioni.sort(function(a, b) {return b.idmisurazione - a.idmisurazione});

      this.shared.setPaziente(this.paziente!);

      this.listMisurazioniConData=[];

      this.grafico.attivaGrafico();

      this.ultimeMisurazioni();
     
      //this.monthPickerComponent.resetDate();
      this.datePickerComponent.resetDate();

    })
  }



ultimeMisurazioni(){
    this.listMisurazioniConData = [];
    for (let i = 0; i < this.listMisurazioni.length; i++) {
      console.log("STAMPO LA MISURAZIONE: " + this.listMisurazioni[i].idmisurazione);
        this.listMisurazioniConData.push(this.listMisurazioni[i]);
    }
  } 

  menopausaSetter() {
    if (this.paziente?.dettagli.menopausa == "1") {
      this.menopausa = "Si";
    }else{
      this.menopausa = "No";
    }
  }

  adattaOrarioMisurazione() {
    for (let i = 0; i < this.listMisurazioni.length; i++) {
      this.listMisurazioni[i].data_misurazione = formatDate(this.listMisurazioni[i].data_misurazione, 'dd-MM-yyyy', 'en');
      //console.log(this.listMisurazioni[i]);
    }
  }

  
  getPazienti() {
    this.pazientiService.getListaPazienti(localStorage.getItem("id_nutrizionista")!).subscribe((res: any) => {
      this.listaPazienti = res.lista_pazienti;
      // inserisco più elementi all interno di listapazienti per fare prove di paginazione
      console.log("list pazienti "+res.lista_pazienti+" "+this.listaPazienti);
    })
  }

  openDialogVisualizzaDieta(misurazione: MisurazionePaziente,ListaMisurazioni: MisurazionePaziente[]) {
      const dialogRef = this.dialog.open(VisualizzaVisitaPazienteComponent, {
      maxHeight: '90vh',
      width: '1150px',
      data: {misurazione,ListaMisurazioni}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  funzioneCheFiltra(month: string, year: string){
    this.listMisurazioniConData = [];
    console.log(month + "-" + year);
    for (let i = 0; i < this.listMisurazioni.length; i++) {
      console.log("STAMPO LA LOCAZIONE: " + this.listMisurazioni[i].data_misurazione);
      if (this.listMisurazioni[i].data_misurazione.includes(month + "-" + year)) {
        this.listMisurazioniConData.push(this.listMisurazioni[i]);
      }
    }
  }

  monthSelected(date: string) {
    const array = date.split('-');
    console.log("data "+date);
    const month = array[0];
    const year = array[1];
    this.funzioneCheFiltra(month, year);
  }

}
