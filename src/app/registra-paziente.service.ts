import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistraPazienteService {

  constructor(private http: HttpClient) { }

  localStorage!: Storage;

  url_registrazione_paziente = 'https://f-taste-backend.bcsoft.net/registrazione_paziente_nutrizionista';


  public registraPaziente(paziente_registrato: any){

    var headers = new HttpHeaders();
    headers = headers.append("Accept", 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Allow-Methods', ['OPTIONS', 'GET', 'POST']);

    console.log(paziente_registrato);
    this.http.post<any>(this.url_registrazione_paziente, paziente_registrato, {headers: headers}).subscribe((data: any) => { //DEVI METTERE IL SUBSCRIBE PERCHE' IL SERVER VUOLE CHE QUALCUNO ASCOLTI LA CHIAMATA
      //PER VERIFICARE CHE LA CHIAMTA CHE INVIA QUALCOSA FUNZIONA FAI IL SUBSCRIBE COME STA QUA'
      console.log(data);
      if(data.esito_registrazione === "successo"){
          alert('Registrazione paziente avvenuta con successo');
      }else if(data.esito_registrazione === "email già esistente"){
        alert("La registrazione non è andata a buon fine. Email già esistente");
      }
    })
  }

}
