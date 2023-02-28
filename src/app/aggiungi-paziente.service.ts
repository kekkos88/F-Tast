import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AggiungiPazienteService {

  constructor(private http: HttpClient) { }

  url = 'https://f-taste-backend.bcsoft.net/add_paziente';

  parametri_input = {
    id_nutrizionista: "",
    id_paziente: ""
  }

  aggiungiPaziente(id_nutrizionista: string, id_paziente: string){
    var headers = new HttpHeaders();
    this.parametri_input.id_nutrizionista = id_nutrizionista;
    this.parametri_input.id_paziente = id_paziente;

    console.log(this.parametri_input);

    return this.http.post<any>(this.url, this.parametri_input, {headers: headers});
  }
}
