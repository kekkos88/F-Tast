import { E } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailTextInput = '';
  passwordTextInput = '';

  elem: HTMLElement | null | undefined;

  //Questo frammento di codice serve a validare se nel form della mail si inserisce una stringa con un formato mail valido
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  //Questo serve per nascondere la password nel form
  hide = true;

  show: boolean =false;
  constructor(private router: Router, private loginService: LoginService,private shared:SharingService) { }

  ngOnInit(): void {
    //this.elem = document.getElementById('navigazione');
    //this.elem!.style.display = 'none';

    this.shared.setShowFalse();

  }

  /*signupUsers() {
    this.router.navigate(['/signup']);
  }
*/

  login() {
    if(this.emailTextInput === "" || this.passwordTextInput === "") {
      alert("I campi Email e Password non possono essere vuoti");
      return;
    }
    console.log(this.emailTextInput, this.passwordTextInput);
    console.log("CHIAMA");

    this.loginService.loginUsers(this.emailTextInput, this.passwordTextInput).subscribe(
      (data) => {
        console.log("DATA login check: ");
        console.log(data);
        if (data) {
          //this.emailTextInput = ''; //Una volta effettuato l'accesso "svuoto" i campi
          //this.passwordTextInput = '';
          this.router.navigate(['/home']);
        } else {
          alert('Email e/o password errati!');
        }
      }
    )
  }
}
