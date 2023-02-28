import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paziente } from './modelli';
import { SharingService } from './sharing.service';

@Injectable({
  providedIn: 'root'
})

export class ModificaPazienteService {

  localStorage!: Storage;

  paziente!: Paziente;

  constructor(private http: HttpClient, private shared: SharingService) {
    this.localStorage = window.localStorage;
   }

  url_modifica_pazienti = 'https://f-taste-backend.bcsoft.net/modifica_profilo_paziente';

  modificaInfoPaziente(parametri: any, id_nutrizionista: string){
    this.paziente = this.shared.getPaziente();

    const parametri_ingresso = {
      id_paziente: this.paziente.dettagli.id_paziente,
      id_nutrizionista: id_nutrizionista,
      parametri: parametri
    }

    console.log("STAMPO PARAMETRI_INGRESSO ");
    console.log(parametri_ingresso);

    var headers = new HttpHeaders();
    return this.http.post<any>(this.url_modifica_pazienti, parametri_ingresso, {headers: headers});

  }

}
