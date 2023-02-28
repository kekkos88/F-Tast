import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PianoGiornalieroService {
  constructor(private http: HttpClient) { }

  url_get_alimenti = 'https://f-taste-backend.bcsoft.net/alimenti';
  url_invia_pianoGiornaliero = 'https://f-taste-backend.bcsoft.net/add_nuovo_piano_giornaliero';
  url_get_dieta = 'https://f-taste-backend.bcsoft.net/get_dieta_giornaliera';

  paramentri_input_get_dieta_giornaliera = {
    id_paziente: "",
    giorno: "",
  }

  parametri_input_clona_pasto = {
    id_paziente: "",
    giorno: "",
  }

  getAlimentiDaServer(){
    var headers = new HttpHeaders();

    return this.http.get<any>(this.url_get_alimenti, {headers : headers});
  }

  salvaPianoGiornaliero(parametri_input: any){
    var headers = new HttpHeaders();

    return this.http.post<any>(this.url_invia_pianoGiornaliero, parametri_input, {headers : headers});
  }

  getDietaGiornaliera(giorno: string, id_paziente: string){

    console.log("sono in getDietaGiornaliera "+ giorno + " "+ id_paziente);
    var headers = new HttpHeaders();

    this.paramentri_input_get_dieta_giornaliera.giorno = giorno;
    this.paramentri_input_get_dieta_giornaliera.id_paziente = id_paziente;

    return this.http.post<any>(this.url_get_dieta, this.paramentri_input_get_dieta_giornaliera, {headers : headers});
  }

  clonaPasto(){

  }

}
