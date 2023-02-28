import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { itemListaAlimento, Paziente, pasto, alimentoDB } from '../modelli';
import { PianoGiornalieroService } from '../piano-giornaliero.service';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-piano-giornaliero',
  templateUrl: './piano-giornaliero.component.html',
  styleUrls: ['./piano-giornaliero.component.css']
})
export class PianoGiornalieroComponent implements OnInit {

  @Input() giorno!: string;

  array: alimentoDB [] = [];
  array2: alimentoDB [] = [];
  array3: alimentoDB [] = [];
  array4: alimentoDB [] = [];
  array5: alimentoDB [] = [];

  listaAlimentiColazione: itemListaAlimento[] = [];
  listaAlimentiSpuntino1: itemListaAlimento[] = [];
  listaAlimentiPranzo: itemListaAlimento[] = [];
  listaAlimentiSpuntino2: itemListaAlimento[] = [];
  listaAlimentiCena: itemListaAlimento[] = [];

  noteColazione: string[] = [];
  noteSpuntino1: string[] = [];
  notePranzo: string[] = [];
  noteSpuntino2: string[] = [];
  noteCena: string[] = [];

  lista_intolleranze:string[]=[];
  intolleranza:string="";

  piano_giornaliero = {
    id_paziente: "",
    id_nutrizionista: "",
    giorno: "",
    colazione: { alimenti: this.array, nota: "" },
    spuntino_1: { alimenti: this.array2, nota: "" },
    pranzo: { alimenti: this.array3, nota: "" },
    spuntino_2: { alimenti: this.array4, nota: "" },
    cena: { alimenti: this.array5, nota: "" },
  }
  
  paziente!: Paziente;
  id_paziente!: string;


  pasti: pasto[] = [
    {nome: 'Colazione', listaAlimenti: this.listaAlimentiColazione, note: this.noteColazione},
    {nome: 'Spuntino1', listaAlimenti: this.listaAlimentiSpuntino1, note: this.noteSpuntino1}, 
    {nome: 'Pranzo', listaAlimenti: this.listaAlimentiPranzo, note: this.notePranzo},
    {nome: 'Spuntino2', listaAlimenti: this.listaAlimentiSpuntino2, note: this.noteSpuntino2},
    {nome: 'Cena', listaAlimenti: this.listaAlimentiCena, note: this.noteCena}
  ];

  constructor(private shared: SharingService, private pianoGiornalieroService: PianoGiornalieroService,private alert:AlertService,private router: Router,private appRef: ApplicationRef) { }

  ngOnInit(): void {
    this.paziente = this.shared.getPaziente();
    this.id_paziente = this.paziente.dettagli.id_paziente;
    this.popoloDietaGiornaliera();
    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; };
    console.log("piano-giornaliero giorno "+this.giorno +"id "+this.id_paziente);
  }
  
  inviaPianoGiornaliero(){
    this.piano_giornaliero.colazione.alimenti = [];
    this.piano_giornaliero.spuntino_1.alimenti = [];
    this.piano_giornaliero.pranzo.alimenti = [];
    this.piano_giornaliero.spuntino_2.alimenti = [];
    this.piano_giornaliero.cena.alimenti = [];

    this.piano_giornaliero.id_paziente = this.id_paziente;
    this.piano_giornaliero.giorno = this.giorno;
    this.piano_giornaliero.id_nutrizionista = localStorage.getItem("id_nutrizionista")!;

    for(let i = 0; i<this.pasti[0].listaAlimenti.length; i++){
      this.piano_giornaliero.colazione.alimenti.push( 
        {
          nome_alimento: this.pasti[0].listaAlimenti[i].nome_alimento,
          codice_alimento: this.pasti[0].listaAlimenti[i].codice_alimento.toString(), 
          quantita: this.pasti[0].listaAlimenti[i].quantita, 
          unita_misura: this.pasti[0].listaAlimenti[i].unita_misura
        })
    }
    this.piano_giornaliero.colazione.nota = this.pasti[0].note[0];


    for(let i=0; i<this.pasti[1].listaAlimenti.length; i++){
      this.piano_giornaliero.spuntino_1.alimenti.push(
        {
          nome_alimento: this.pasti[1].listaAlimenti[i].nome_alimento,
          codice_alimento: this.pasti[1].listaAlimenti[i].codice_alimento.toString(), 
          quantita: this.pasti[1].listaAlimenti[i].quantita, 
          unita_misura: this.pasti[1].listaAlimenti[i].unita_misura
        });
    }
    this.piano_giornaliero.spuntino_1.nota = this.pasti[1].note[0];


    for(let i=0; i<this.pasti[2].listaAlimenti.length; i++){
      this.piano_giornaliero.pranzo.alimenti.push(
        {
          nome_alimento: this.pasti[2].listaAlimenti[i].nome_alimento,
          codice_alimento: this.pasti[2].listaAlimenti[i].codice_alimento.toString(), 
          quantita: this.pasti[2].listaAlimenti[i].quantita, 
          unita_misura: this.pasti[2].listaAlimenti[i].unita_misura
        });
    }
    this.piano_giornaliero.pranzo.nota = this.pasti[2].note[0];


    for(let i=0; i<this.pasti[3].listaAlimenti.length; i++){
      this.piano_giornaliero.spuntino_2.alimenti.push(
        {
          nome_alimento: this.pasti[3].listaAlimenti[i].nome_alimento,
          codice_alimento: this.pasti[3].listaAlimenti[i].codice_alimento.toString(), 
          quantita: this.pasti[3].listaAlimenti[i].quantita, 
          unita_misura: this.pasti[3].listaAlimenti[i].unita_misura
        });
    }
    this.piano_giornaliero.spuntino_2.nota = this.pasti[3].note[0];

    for(let i=0; i<this.pasti[4].listaAlimenti.length; i++){
      this.piano_giornaliero.cena.alimenti.push(
        {
          nome_alimento: this.pasti[4].listaAlimenti[i].nome_alimento,
          codice_alimento: this.pasti[4].listaAlimenti[i].codice_alimento.toString(), 
          quantita: this.pasti[4].listaAlimenti[i].quantita, 
          unita_misura: this.pasti[4].listaAlimenti[i].unita_misura
        });
    }
    this.piano_giornaliero.cena.nota = this.pasti[4].note[0];

    this.pianoGiornalieroService.salvaPianoGiornaliero(this.piano_giornaliero).subscribe((data: any) => {
      console.log(data);
      if(data.esito_aggiunta_dieta == "successo"){
        this.alert.avvisoOk("Dieta inviata con successo!");
      }else{
        this.alert.avvisoOk("Errore: "+data.esito_aggiunta_dieta);
      }
    });
    console.log(this.piano_giornaliero);
  }


 async  popoloDietaGiornaliera(){
    console.log("dentro popoloDieta "+this.giorno + " "+this.id_paziente);
    this.pianoGiornalieroService.getDietaGiornaliera(this.giorno, this.id_paziente).subscribe((data:any) => {
      console.log("popolo dieta "+data.colazione.descrizione_pasto);

      this.pasti[0].listaAlimenti = data.colazione.descrizione_pasto;
      this.pasti[0].note[0] = data.colazione.nota;

      this.pasti[1].listaAlimenti = data.spuntino_1.descrizione_pasto;
      this.pasti[1].note[0] = data.spuntino_1.nota;

      this.pasti[2].listaAlimenti = data.pranzo.descrizione_pasto;
      this.pasti[2].note[0] = data.pranzo.nota;

      this.pasti[3].listaAlimenti = data.spuntino_2.descrizione_pasto;
      this.pasti[3].note[0] = data.spuntino_2.nota;

      this.pasti[4].listaAlimenti = data.cena.descrizione_pasto;
      this.pasti[4].note[0] = data.cena.nota;
    })
  }

}
