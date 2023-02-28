import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';

import { SharingService } from '../sharing.service';
import { MisurazionePaziente, parametriGrafico, Paziente } from '../modelli';
import { PazientiComponent } from '../pazienti/pazienti.component';
import { PazientiService } from '../pazienti.service';
import { MatTabLabelWrapper } from '@angular/material/tabs';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import {Chart ,ChartType } from 'chart.js';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import {formatDate} from '@angular/common';
import 'chartjs-adapter-date-fns'
import { de } from 'date-fns/locale';

@Component({
  selector: 'app-grafici',
  templateUrl: './grafici.component.html',
  styleUrls: ['./grafici.component.css'],
})

@Injectable({
  providedIn: 'root'
})

export class GraficiComponent implements OnInit {
  constructor(private shared: SharingService,private pazientiService:PazientiService) { 
  }


  public labels :string[]=['asd','ada','eee'];

  paziente: Paziente | undefined;
  listMisurazioniConData: MisurazionePaziente[] = [];
  listMisurazioni: MisurazionePaziente[] = [];
  dataUltimi30Giorni!: string;
  Date = new Date();
  dateToDay=formatDate(new Date(),'yyyy-MM-dd', 'en-US');
    public label :string ="";


    label2 :string="genge  ";

    public barChartType: ChartType = 'bar';

    public myChart!: Chart;

    ngOnInit(): void {
      this.paziente = this.shared.getPaziente(); 
      this.attivaGrafico();
    }

    attivaGrafico():void{
      this.paziente = this.shared.getPaziente(); 
      this.listMisurazioniConData=this.paziente.dettagli.storico_misurazioni;
      console.log("ho cliccato su attivaGrafico");
      this.ultimeMisurazioni();
    }
  

    grafico(){
    
    let myChart = new Chart("myChart", {
        type: 'line',
        data: {
            datasets:[
              {
              label: 'Bmi',
              data: [{x: '2012-12-22', y: 24},{x:'2013-12-26', y: 2},{x:'2014-05-25', y: 20},{x: '2014-07-26', y: 10}],
              tension:0.4
              },
              {
                label: 'Peso',
                data: [{x: '2012-12-22', y: 90},{x: '2013-12-26', y: 60},{x: '2014-05-25', y: 80},{x: '2014-07-26', y: 75},],
                tension:0.4
              }
                ],    
        },
        options: {
          scales: {
              x: {  
                type: 'time',
                time: {
                  unit:'day',
                },
            },
            y: {
              beginAtZero:true,

            }
          },
        },
      });
    }

  

    ngAfterViewInit() {
      this.grafico();
    }

  //utilizzo questa funzione per settare correttamente la data per il grafico
    reverseDate(str:string){ 
      var dateToDay:string;
      var splitted =str.split("-");
      dateToDay=splitted[2]+"-"+splitted[1]+"-"+splitted[0];
      console.log("data "+formatDate(dateToDay,'YYYY-MM-dd','en-US'));
      return formatDate(dateToDay,'yyyy-MM-dd','en-US');
     } 

ultimeMisurazioni(){
  let ultimeMisurazioni=5;
  // inverto le misurazioni per visualizzarle dalle ultime alle meno recenti.
  this.listMisurazioniConData.reverse();

  let inizioMisurazioni=this.listMisurazioniConData.length-ultimeMisurazioni;
  if(inizioMisurazioni <=0){inizioMisurazioni=0;}

  this.labels.length=0;
  this.label="Bmi";

  let bmi:parametriGrafico[]=[];
  let peso:parametriGrafico[]=[];

  for (let i = 0; i < this.listMisurazioniConData.length; i++){
  console.log("data :"+this.listMisurazioniConData[i].data_misurazione)  
  }

 bmi.splice(0,bmi.length);
  for (let i = inizioMisurazioni; i < this.listMisurazioniConData.length; i++){
    bmi.push({x:this.reverseDate(this.listMisurazioniConData[i].data_misurazione),y:this.listMisurazioniConData[i].bmi});
    }
    

    for (let i = 0; i < bmi.length; i++){
       console.log("nuovo for bmi"+bmi[i].x+" "+bmi[i].y);
      }


   for (let i = inizioMisurazioni; i < this.listMisurazioniConData.length; i++){
    peso.push({x:this.reverseDate(this.listMisurazioniConData[i].data_misurazione),y:this.listMisurazioniConData[i].peso});
   //console.log("nuovo for peso"+this.listMisurazioniConData[i].peso);
    }

    this.listMisurazioniConData.reverse();

    //distruggo il vecchio canvas
    let chartStatus = Chart.getChart("myChart");
        chartStatus?.destroy();

    // creo il nuovo canvas
    Chart.defaults.font.size = 10;
   let myChart = new Chart("myChart", {
   type: 'line',
   data: {
    labels : this.labels,
       datasets: [{
           label: 'Bmi',
           data: bmi,
           tension:0.2,
           borderWidth: 2,  
       }
      , {
         label: 'Peso',
         data: peso,
         tension:0.2,
         borderWidth: 2,
     },
     ],  
   },
   options: {
          
    scales: {
        x: {
          type: 'time',
          time: {
          unit:'day',

          },

      },
      y: {
        beginAtZero:true,

      }
    },
  },
  });
}
    

}


