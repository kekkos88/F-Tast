import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AlertService } from "./alert.service";

@Injectable()
export class TokenService implements HttpInterceptor {

  accessToken!: string|null;
  refreshToken!: string|null;
  localStorage: Storage;

  constructor( private alert :AlertService) { 
    this.localStorage = window.localStorage;
    this.setAccessTokenTokenFromStorage();
    this.setRefreshTokenTokenFromStorage();
   // this.accessToken = ( localStorage.getItem('access_token'));
  }

  async setAccessTokenTokenFromStorage(){
    const token = await (this.accessToken = (localStorage.getItem('access_token')));
  }

  getAccessToken(){
    return this.accessToken;
  }

  async setRefreshTokenTokenFromStorage(){
    const token= await (this.refreshToken = await localStorage.getItem('refresh_token'));
  }

  getNewAccessToken() {
    this.setRefreshTokenTokenFromStorage()
    //TODO
  }

 /*async appendAccessToken(headers: HttpHeaders){
   await this.setAccessTokenTokenFromStorage();
    headers = headers.append('Authorization', 'Bearer ' + this.accessToken);
    return headers;
  }*/

  /*
  async appendRefreshToken(headers: HttpHeaders){
    await this.setRefreshTokenTokenFromStorage();
    headers = headers.append('Authorization', 'Bearer ' + this.refreshToken);
    return headers;
  }*/

  /*
  requestNewAccessToken(){
    let newAccessToken = '';
    this.accessToken = newAccessToken;
  }
  */
 
  //function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let updatedRequest = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + this.accessToken)
    });
    
    if (!this.accessToken) {
      this.setAccessTokenTokenFromStorage();
      console.error('Il token di autorizzazione non è presente nella richiesta-> '+this.accessToken);
      updatedRequest = updatedRequest.clone({
      headers: request.headers.set("Authorization", "Bearer " + localStorage.getItem('refresh_token'))
      });
    } 


    //how to update the request Parameters
  /*  const updatedRequest = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + this.accessToken)
    });*/
    //logging the updated Parameters to browser's console
    //console.log("Before making api call : ", updatedRequest);
   /* return next.handle(updatedRequest).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
          //console.log("api call success :", event);
          }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (event instanceof HttpErrorResponse) {
          //console.log("api call error :", event);
          }
        }
      ),
    );
  }*/

    return next.handle(updatedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.alert.avvisoOk("Si prega di rifare il login, token scaduto!");

          console.log("Errore 401 o 403: ", error.message);
        }
        return throwError(error);
      })
    );
}

}

/*TODO service di controllo e utilizzo del' access token e refresh token.
refresh token scade una volta al mese
access token scade una volta all'ora
utilizza refresh token per avere il nuovo access token
logga di nuovo per ottenere il nuovo refresh token e un access token dalla durata di un ora
controllo che la chiamata è andata a buon fine. altrimenti controllo del messaggio di errore
se è scaduto l'access token rimandare il refresh token per riavere la access e ripetere l'operazione.

*/
