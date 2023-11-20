import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { AgragarManicuristaComponent } from './agragar-manicurista/agragar-manicurista.component';
import { ContactoComponent } from './contacto/contacto.component';
const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'Login', component: LoginComponent },
  { path:'AgrManicurista', component:AgragarManicuristaComponent},
  { path:'Contacto', component:ContactoComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
