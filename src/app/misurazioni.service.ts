import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MisurazioniService {

  constructor(private http: HttpClient) { }

  localStorage!: Storage;

  url = 'https://f-taste-backend.bcsoft.net/add_misurazione_medico';

  parametri_input = {
    id_nutrizionista: "",
    id_paziente: "",
    misurazioneForm: [""],
    data_misurazione: ""
  }

  salvaMisurazione(id_nutrizionista: string ,id_paziente: string, misurazioneForm: any[], data_misurazione: string){

    var headers = new HttpHeaders();
    this.parametri_input.id_nutrizionista = id_nutrizionista;
    this.parametri_input.id_paziente = id_paziente;
    this.parametri_input.misurazioneForm = misurazioneForm;
    this.parametri_input.data_misurazione = data_misurazione;

    console.log("STO IN SALVA MISURAZIONE");
    console.log(this.parametri_input);

    return this.http.post<any>(this.url, this.parametri_input, {headers : headers});
  }

}
