import { ApplicationRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoPazienteComponent } from '../info-paziente/info-paziente.component';
import { giorniDieta, Paziente } from '../modelli';
import { SharingService } from '../sharing.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AlertService } from '../alert.service';


@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.css']
})
export class DietaComponent implements OnInit {

  paziente!: Paziente;
  id_paziente!: string;

  giorniSettimanali: giorniDieta[] = [
    {nome: "Lunedi"},
    {nome: "Martedi"},
    {nome: "Mercoledi"},
    {nome: "Giovedi"},
    {nome: "Venerdi"},
    {nome: "Sabato"},
    {nome: "Domenica"}
  ];
 

  constructor(private shared: SharingService,private dialog: MatDialog,private breakpointObserver: BreakpointObserver,private alert:AlertService) { }

  ngOnInit(): void {
    this.paziente = this.shared.getPaziente();
    this.id_paziente = this.paziente.dettagli.id_paziente;
  }

  
  infoPaziente(){
    const dialogRef = this.dialog.open(InfoPazienteComponent, 
     {maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'full-screen-modal'});
    
  }

  getDialogDimensions() {
    const mobileDialogConfig = {
      maxHeight: '300px',
      maxWidth: ''
      
    };

    const desktopDialogConfig = {
      maxHeight: '600px',
      maxWidth: ''
    };

    const isMobile = this.breakpointObserver.isMatched('(max-maxHeight: 600px)');
    return isMobile ? mobileDialogConfig : desktopDialogConfig;
  }

}
