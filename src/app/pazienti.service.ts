import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MisurazionePaziente, Paziente, response } from './modelli';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class PazientiService {
  constructor(private http: HttpClient) { }

  url_lista_pazienti = 'https://f-taste-backend.bcsoft.net/lista_pazienti';
  url_dettaglio = 'https://f-taste-backend.bcsoft.net/dettaglio_paziente';
  url_dieta = 'https://f-taste-backend.bcsoft.net/alimento';
  url_aggiungi_nuova_dieta = 'https://f-taste-backend.bcsoft.net/add_nuova_dieta';
  url_rete_neurale = 'https://f-taste-backend.bcsoft.net/neural_net';

  parametri_login = {
    id_nutrizionista:""
  };

  dettaglio_paziente = {
    id_nutrizionista: "",
    id_paziente: ""
  }

  parametri_input_add_nuova_dieta = {
    id_paziente: "",
    id_nutrizionista: "",
    data: ""
  }

  parametri_input_rete_neurale = {
    glucose: 0,
    triglycerides: 0,
    hdl: 0,
    systolic: 0,
    diastolic: 0,
    gender: "",
    age: 0,
    weight: 0,
    bmi: 0
  }

   public getListaPazienti(id_nutrizionista: string){
    var headers = new HttpHeaders();
    this.parametri_login.id_nutrizionista = id_nutrizionista;
   return this.http.post<response>(this.url_lista_pazienti,this.parametri_login,{headers : headers});
  }

  public nuovaDieta(id_paziente: string, id_nutrizionista: string, data: string){
    var headers = new HttpHeaders();

    this.parametri_input_add_nuova_dieta.id_paziente = id_paziente;
    this.parametri_input_add_nuova_dieta.id_nutrizionista = id_nutrizionista;
    this.parametri_input_add_nuova_dieta.data = data;

    console.log("STAMPO ADD NUOVA DIETA");
    console.log(this.parametri_input_add_nuova_dieta);

    return this.http.post<any>(this.url_aggiungi_nuova_dieta, this.parametri_input_add_nuova_dieta, {headers: headers});
  }

  public chiamaReteNeurale(misurazione: MisurazionePaziente){
    var headers = new HttpHeaders();

    this.parametri_input_rete_neurale.glucose = misurazione.glucosio;
    this.parametri_input_rete_neurale.triglycerides = misurazione.trigliceridi;
    this.parametri_input_rete_neurale.bmi = misurazione.bmi;
    this.parametri_input_rete_neurale.diastolic = misurazione.pressione_diastole;
    this.parametri_input_rete_neurale.systolic = misurazione.pressione_sistole;
    this.parametri_input_rete_neurale.hdl = misurazione.colesterolo_DHL;
    this.parametri_input_rete_neurale.weight = misurazione.peso;
    this.parametri_input_rete_neurale.age = misurazione.eta;
    this.parametri_input_rete_neurale.gender = misurazione.sesso;
    
    return this.http.post<any>(this.url_rete_neurale, this.parametri_input_rete_neurale, {headers: headers});
  }

  public getDettaglioPaziente(codicePaziente: string, id_nutrizionista: string){
    var headers = new HttpHeaders();
    //console.log(this.dettaglio_paziente);
    this.dettaglio_paziente.id_nutrizionista = id_nutrizionista
    this.dettaglio_paziente.id_paziente = codicePaziente;

    console.log(this.dettaglio_paziente);

   return this.http.post<Paziente>(this.url_dettaglio, this.dettaglio_paziente, {headers : headers});
  }

}
