import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import {MatPaginatorModule} from '@angular/material/paginator'; // ho importato il modulo per la paginazione


export interface Paziente {
  esito_dettagli_paziente: string;
  dettagli: DettagliPaziente;
}

export interface DettagliPaziente {
  id_paziente: string;
  eta: string;
  menopausa: string;
  sesso: string;
  altezza: string;
  dieta: string;
  peso: string;
  intolleranze: string[];
  patologie: string[];
  allergie: string[];
  storico_misurazioni: MisurazionePaziente[];
}

export interface alimentoDB{
  nome_alimento: string;
  codice_alimento: string;
  quantita: string;
  unita_misura: string;
}

export interface giorniDieta {
  nome: string;
}

export interface alimento {
  alimento: string;
  codice: number;
}

export interface pasto {
  nome: string;
  listaAlimenti: itemListaAlimento[];
  note: string[];
}

export interface itemListaAlimento{
  nome_alimento: string;
  codice_alimento: number;
  unita_misura: string;
  quantita: string;
}

export interface MisurazionePaziente {
  altezza: number,
  bmi: number,
  colesterolo_DHL: number,
  data_misurazione: string,
  fkpaziente: string,
  fianchi: number,
  glucosio: number,
  idmisurazione: number,
  menopausa: number,
  peso: number,
  pressione_diastole: number,
  pressione_sistole: number,
  trigliceridi: number,
  vita: number,
  sesso: number,
  eta: number,
  massa_magra:number;
  
}

export interface Paziente {
  esito_dettagli_paziente: string;
  dettagli: DettagliPaziente;
}

export interface response {
  esito_lista: string,
  lista_pazienti: string[]
}

export interface Esito {
  esito_login: string;
  access_token: string;
  id_nutrizionista: string;
}

//interfaccia utile per il passaggio dei dati a "visualizza visita".
export interface DialogData {
  misurazione: MisurazionePaziente;
  ListaMisurazioni: MisurazionePaziente[];
}

export interface parametriGrafico {
  x:string;
  y:number;
}