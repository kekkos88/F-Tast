import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistraPazienteService } from '../registra-paziente.service';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-registra-paziente',
  templateUrl: './registra-paziente.component.html',
  styleUrls: ['./registra-paziente.component.css']
})
export class RegistraPazienteComponent implements OnInit {
  [x: string]: any;


  hide = true;


  localStorage!: Storage;
  registrazioneForm = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    passwordControl : new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$')]),
    sesso: new FormControl('',[Validators.required]),
    dataDiNascita: new FormControl('',[Validators.required])
  })

  get emailControl() {
    return this.registrazioneForm.get('email')
  }

  get passwordControl() {
    return this.registrazioneForm.get('passwordControl')
  }

  get sesso() {
    return this.registrazioneForm.get('sesso')
  }

  get dataDiNascita() {
    return this.registrazioneForm.get('dataDiNascita')
  }

  getErrorMessageEmail() {
    if (this.emailControl?.hasError('required')) {
      return 'Inserisci una mail valida';
    }

    return this.registrazioneForm.get('email')?.hasError('email') ? 'Email non valida' : null;

  }
  getErrorMessagePassword(){
    if (this.passwordControl?.hasError('required')) {

      return 'Inserisci una password valida';
    }

    if (this.passwordControl?.hasError('pattern')){
      return 'Password non valida';
    }
    return null;
  }

  submit(form: Boolean){
    return form;
  }

  stampa(){
  console.log(this.passwordControl?.hasError('required'))
  }
  constructor(private registrazioneService: RegistraPazienteService) { }

  ngOnInit(): void {

  }

  paziente_registrato = { //BODY o JSON DA INVIARE AL SERVER CON LE INFORMAZIONI ALL'INTERNO
    id_nutrizionista: "3",
    email: "robertoassante@live.com",
    password: "123456ciao",
    sesso: "",
    datanascita: ""
  }


  public registraPaziente(){

    this.paziente_registrato.email = this.emailControl?.value;
    this.paziente_registrato.password = this.passwordControl?.value;
    this.paziente_registrato.id_nutrizionista = localStorage.getItem("id_nutrizionista")!;
    this.paziente_registrato.sesso = this.sesso?.value;
    this.paziente_registrato.datanascita = formatDate(this.dataDiNascita?.value, 'YYYY-MM-dd', 'en');

    if(this.paziente_registrato.email === "" || this.paziente_registrato.password === ""){
      alert("Il campo Email/Password non può essere vuoto");
      return;
    }

    this.registrazioneService.registraPaziente(this.paziente_registrato);

  }
  callingFunction() {
    console.log(this.registrazioneForm.value);
   }

}
