import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MisurazioniComponent } from './misurazioni/misurazioni.component';
import { FilterPipe, PazientiComponent } from './pazienti/pazienti.component';//
import { NuovaMisurazioneComponent } from './nuova-misurazione/nuova-misurazione.component';
import { DietaComponent } from './dieta/dieta.component';
import { PianoGiornalieroComponent } from './piano-giornaliero/piano-giornaliero.component';
import { ModificaPazienteComponent } from './modifica-paziente/modifica-paziente.component';
import { AggiungiPazienteComponent } from './aggiungi-paziente/aggiungi-paziente.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistraPazienteComponent } from './registra-paziente/registra-paziente.component';
import { VisualizzaVisitaPazienteComponent } from './visualizza-visita-paziente/visualizza-visita-paziente.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { PastoComponent } from './pasto/pasto.component';
import { ScegliDietaComponent } from './scegli-dieta/scegli-dieta.component';
import { TokenService } from './token.service';
import { NgxPaginationModule } from 'ngx-pagination';// ho importato il modulo per la paginazione
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GraficiComponent } from './grafici/grafici.component';
import { NgChartsModule } from 'ng2-charts';
import { InfoPazienteComponent } from './info-paziente/info-paziente.component';
import { VisualizzaVisitaPazienteInfoComponent } from './visualizza-visita-paziente-info/visualizza-visita-paziente-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AgendaComponent } from './agenda/agenda.component';

import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap'



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavBarComponent,
    MisurazioniComponent,
    PazientiComponent,
    NuovaMisurazioneComponent,
    DietaComponent,
    PianoGiornalieroComponent,
    ModificaPazienteComponent,
    AggiungiPazienteComponent,
    HomePageComponent,
    RegistraPazienteComponent,
    VisualizzaVisitaPazienteComponent,
    MonthPickerComponent,
    PastoComponent,
    ScegliDietaComponent,
    FilterPipe,
    GraficiComponent,
    InfoPazienteComponent,
    VisualizzaVisitaPazienteInfoComponent,
    AgendaComponent,
  
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgChartsModule,
    MatTabsModule,
    //calendario
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserModule,
    AppRoutingModule,
    NgbModalModule,
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
