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
import { FechasAgendadasComponent } from './fechas-agendadas/fechas-agendadas.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'Inicio', component: PrincipalComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'AgrManicurista', component: AgragarManicuristaComponent, canActivate: [AuthGuard] },
  { path: 'Calendario', component: CalendarioManicuristaComponent, canActivate: [AuthGuard] },
  { path: 'agendarCita', component: AgendacionCitasComponent, canActivate: [AuthGuard] },
  { path: 'contacto', component: ContactoComponent, canActivate: [AuthGuard] },
  { path: 'Manicuristas', component: ManicuristasComponent, canActivate: [AuthGuard] },
  { path: 'favoritos', component: FavoritosComponent, canActivate: [AuthGuard] },
  { path: 'ayuda', component: AyudaComponent, canActivate: [AuthGuard] },
  { path: 'fechas-agendadas', component: FechasAgendadasComponent, canActivate: [AuthGuard] },
  { path: 'Configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard] },
  {path: 'catalogo',component:CatalogoComponent ,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
