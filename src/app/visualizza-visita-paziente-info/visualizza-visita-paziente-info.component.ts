import { AfterViewInit, Component, Injectable, Input, OnInit } from '@angular/core';
import { DialogData, MisurazionePaziente, parametriGrafico, Paziente } from '../modelli';
import {Chart ,ChartType } from 'chart.js';
import { trigger } from '@angular/animations';
import { delay } from 'rxjs';
import {DatePipe, formatDate} from '@angular/common';
import { SharingService } from '../sharing.service';
import { PazientiService } from '../pazienti.service';
import { VisualizzaVisitaPazienteComponent } from '../visualizza-visita-paziente/visualizza-visita-paziente.component';

@Component({
  selector: 'app-visualizza-visita-paziente-info',
  templateUrl: './visualizza-visita-paziente-info.component.html',
  styleUrls: ['./visualizza-visita-paziente-info.component.css'],
  providers: [DatePipe]
})

@Injectable({
  providedIn: 'root'
})

export class VisualizzaVisitaPazienteInfoComponent implements OnInit,AfterViewInit {

 @Input()data!: DialogData;
 @Input()misurazione!: MisurazionePaziente;

 disabilitaPulsanteRete: boolean = true;
 constructor(public datepipe: DatePipe, private shared: SharingService,private pazientiService: PazientiService, private visusalizzaPazeinte: VisualizzaVisitaPazienteComponent) {}

 public label :string ="";
 menopausa: string | undefined;
 public labels :string[]=[];
 public myChart2!: Chart;
 paziente!: Paziente;
 res_rete_neurale!: number;
 nomeChart :string ="";

  ngOnInit(): void {
    //do un nome ad ogni canvas col nome dell'ID
    this.nomeChart=this.misurazione.idmisurazione.toString();
    this.menopausaSetter();
    this.paziente = this.shared.getPaziente();
    this.misurazione.sesso= this.setSesso();
    this.misurazione.eta=this.setEtaMisurazione();
    console.log(" sesso : "+this.misurazione.sesso);
  }

  ngAfterViewInit() {
    console.log("nome:"+this.misurazione.idmisurazione.toString());
    this.ultimeMisurazioni();
  }

  setSesso(){
    if(this.paziente?.dettagli.sesso == 'Femmina')
    {
      return Number("0");
    }
    return Number("1");
   }

   setEtaMisurazione(){
    let eta : number;;
    var splitted =this.data.misurazione.data_misurazione.split("-");
    eta=Number(splitted[2])-(Number(formatDate(new Date,'yyyy','en-US'))-Number(this.paziente?.dettagli.eta));
    console.log("eta  " +eta+" split 2 "+splitted[2]+" data oggi "+formatDate(new Date,'yyyy','en-US')+" eta paziente " +this.paziente?.dettagli.eta);
    return eta;
   }

  menopausaSetter(){
    if(this.misurazione.menopausa == 1 ){
      this.menopausa = "Si";
    }else{
      this.menopausa = "No";
    }
  }
  //utilizzo questa funzione per settare correttamente la data per il grafico
  reverseDate(str:string){ 
    var dateToDay:string;
    var splitted =str.split("-");
    dateToDay=splitted[2]+"-"+splitted[1]+"-"+splitted[0];
    console.log("data "+formatDate(dateToDay,'YYYY-MM-dd','en-US'));
    return formatDate(dateToDay,'yyyy-MM-dd','en-US');
   }
   
   chiamaReteNeurale(){
    this.pazientiService.chiamaReteNeurale(this.misurazione).subscribe((data: any) => {
      console.log(data);
      this.res_rete_neurale = data.prediction * 100;
    })
  }

  onClickOk(){
    this.visusalizzaPazeinte.onClickOk();
  }

  ultimeMisurazioni(){ 

    let exit=false;
    let count =0;
    
    //inverto le misurazioni per visualizzarle dalle ultime alle meno recenti.
    this.data.ListaMisurazioni.reverse();
    
    while(count <= this.data.ListaMisurazioni.length && exit==false){
      if(this.data.ListaMisurazioni[count].idmisurazione == this.misurazione.idmisurazione){
        exit=true;
      }
      count++;
    }

    let inizioMisurazioni=count-5;
    let fineMisurazioni=count;
    console.log("inizio misuraizone "+inizioMisurazioni+" fine misuraizone "+fineMisurazioni);
    
    if((inizioMisurazioni)<=0){
      inizioMisurazioni=0;
      if(this.data.ListaMisurazioni.length>=5)
        {fineMisurazioni=5;}
      else
        { fineMisurazioni=this.data.ListaMisurazioni.length}
    }
    

    this.labels.length=0;
    this.label="Bmi";

    let bmi:parametriGrafico[]=[];
    let peso:parametriGrafico[]=[];
  
    for (let i = inizioMisurazioni; i < fineMisurazioni; i++){
      console.log("data "+ this.data.ListaMisurazioni[i].data_misurazione);
      bmi.push({x:this.reverseDate(this.data.ListaMisurazioni[i].data_misurazione),y:this.data.ListaMisurazioni[i].bmi});
    // console.log("nuovo for bmi"+this.data.ListaMisurazioni[i].bmi);
      }
  
     for (let i = inizioMisurazioni; i < fineMisurazioni; i++){
      peso.push({x:this.reverseDate(this.data.ListaMisurazioni[i].data_misurazione),y:this.data.ListaMisurazioni[i].peso});
      // console.log("Char Laberls "+this.labels);
        }
  
      this.data.ListaMisurazioni.reverse();

      //distruggo il vecchio canvas
      let chartStatus = Chart.getChart(this.nomeChart);
      if(chartStatus)
      {console.log("si");
       chartStatus?.destroy();
      }else{console.log("no");}

      //creo il nuovo canvas
     Chart.defaults.font.size = 10;
     let myChart = new Chart(this.nomeChart, {
      type: 'line',
      data: {
       labels : this.labels,
      
          datasets: [{
              label: 'Bmi',
              data: bmi,
              borderWidth: 2, 
              tension: 0.2
          }
         , {
            label: 'Peso',
            data: peso,
            borderWidth: 2,
            tension: 0.2
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
