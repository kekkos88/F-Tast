import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MisurazioniComponent } from './misurazioni/misurazioni.component';
import { PazientiComponent } from './pazienti/pazienti.component';
import { DietaComponent } from './dieta/dieta.component';
import { ModificaPazienteComponent } from './modifica-paziente/modifica-paziente.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InfoPazienteComponent } from './info-paziente/info-paziente.component';
import { AgendaComponent } from './agenda/agenda.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home-page', component:  HomePageComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'misurazioni', component: MisurazioniComponent
  },
  {
    path: 'pazienti', component: PazientiComponent
  },
  {
    path: 'dieta', component: DietaComponent
  },
  {
    path: 'modifica', component: ModificaPazienteComponent
  },
  {
    path: 'agenda', component: AgendaComponent,
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
