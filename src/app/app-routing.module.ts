import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { AgragarManicuristaComponent } from './agregar-manicurista/agragar-manicurista.component';
import { AgendacionCitasComponent } from './agendacion-citas/agendacion-citas.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ManicuristasComponent } from './manicuristas/manicuristas.component';
import { CalendarioManicuristaComponent } from './calendario-manicurista/calendario-manicurista.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { from } from 'rxjs';
const routes: Routes = [
  { path: '', component: PrincipalComponent },
  {path:'Inicio',component:PrincipalComponent},
  { path: 'Login', component: LoginComponent },
  { path:'AgrManicurista', component:AgragarManicuristaComponent},
  {path:'Calendario',component:CalendarioManicuristaComponent},
  {path:'agendarCita',component:AgendacionCitasComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'Manicuristas',component:ManicuristasComponent},
  {path:'favoritos',component:FavoritosComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
