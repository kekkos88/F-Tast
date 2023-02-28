import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  localStorage: Storage;

  constructor(public http: HttpClient) {
    this.localStorage = window.localStorage;
  }

  loginUsers(email_p: string, password_p: string): Observable<boolean> {
    let emailInserita = ''; //let perchè è una variabile che viene prima inizializzata e verrà poi re-inizializzata
    let passwordInserita = '';

    emailInserita = email_p; //re-inizializzazione
    passwordInserita = password_p;


    console.log(emailInserita + "  " + passwordInserita);


    return this.loginCheck(emailInserita, passwordInserita);
  }

  loginCheck(email_p: string, password_p: string): Observable<boolean> {
    interface Esito {
      esito_login: string;
      refresh_token: string;
      access_token: string;
      id_nutrizionista: string;
    }

    var subject = new Subject<boolean>();

    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', ['OPTIONS', 'GET', 'POST']);

    const parametri_login = { email: email_p, password: password_p };

    this.http.post<Esito>("https://f-taste-backend.bcsoft.net/login_nutrizionista", parametri_login, { headers: headers })
      .subscribe((data: Esito) => {
        console.log(data);
        console.log("Esito del login:" + data.esito_login);
        if (data.esito_login == "successo") {
          subject.next(true);
          console.log("token:" + data.access_token);
          console.log("id_nutrizionista:" + data.id_nutrizionista);
          this,this.localStorage.setItem('refresh_token', data.refresh_token);
          this.localStorage.setItem('access_token', data.access_token);
          this.localStorage.setItem('id_nutrizionista', data.id_nutrizionista);


        } else {
          subject.next(false);
        }


      });

    return subject.asObservable();
 }
}
