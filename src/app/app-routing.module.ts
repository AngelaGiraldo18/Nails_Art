import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { AgragarManicuristaComponent } from './agragar-manicurista/agragar-manicurista.component';
import { AgendacionCitasComponent } from './agendacion-citas/agendacion-citas.component';
import { CalendarioManicuristaComponent } from './calendario-manicurista/calendario-manicurista.component';
const routes: Routes = [
  { path: '', component: PrincipalComponent },
  {path:'Inicio',component:PrincipalComponent},
  { path: 'Login', component: LoginComponent },
  { path:'AgrManicurista', component:AgragarManicuristaComponent},
  {path:'Calendario',component:CalendarioManicuristaComponent},
  {path:'agendarCita',component:AgendacionCitasComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
