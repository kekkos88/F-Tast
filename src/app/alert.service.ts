import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  constructor() { }

  async confirmIntolleranza(testo : string){
    var ritorno = true;
    if(testo !=""){
      console.log("sono dentro intolleranza");
      const alert= await  Swal.fire({
          position:'top',    
          title:' <strong>Attenzione!</strong>',
          html: 'Intolleranza trovata.'+'<br>'+'Sei sicuro/a di voler aggiungere il seguente alimento ?<br>'+'<strong>'+testo+'</strong>',
          showCancelButton: true,   
          confirmButtonText: 'Conferma',
          cancelButtonText:'Annulla'
        }).then( (result)=>{
          if( result.isConfirmed){
              ritorno=true;
          }else{
            ritorno=false;}
        }
        )
    }
    console.log("ritorno intolleranza "+ritorno);
    return  ritorno;
  }
  

  async confirmAllergene(testo : string){
    var ritorno= true;
    if(testo !=''){
      const alert = await Swal.fire({ 
            position:'top',    
            title:' <strong>Attenzione!</strong>',
            html: 'Allergene trovato.'+'<br>'+'Sei sicuro/a di voler aggiungere il seguente alimento ?<br>'+'<strong>'+testo+'</strong>',
            showCancelButton: true,   
            confirmButtonText: 'Conferma',
            cancelButtonText:'Annulla'
          }).then(async (result)=> {
            if(await result.isConfirmed){
                ritorno=true;
            }else{ritorno=false;}
          }
          )
        }
        console.log("ritorno allergene "+ritorno);
    return await ritorno;
  }

  async avvisoConConferma(testo : string){
    var ritorno= true;
    if(testo !=''){
      const alert = await Swal.fire({ 
            position:'top',    
            title:' <strong>Attenzione!</strong>',
            html: testo,
            showCancelButton: true,   
            confirmButtonText: 'Conferma',
            cancelButtonText:'Annulla'
          }).then(async (result)=> {
            if(await result.isConfirmed){
                ritorno=true;
            }else{ritorno=false;}
          }
          )
        } 
    return await ritorno;
  }

   avvisoOk(testo : string){  
    if(testo !=''){
      const alert =  Swal.fire({ 
            position:'top',    
          //  title:' <strong>Attenzione!</strong>',
            html: testo,
            confirmButtonText: 'Ok',
          })
        }    
  }
}
