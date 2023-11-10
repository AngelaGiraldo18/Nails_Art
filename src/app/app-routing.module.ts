import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { AgragarManicuristaComponent } from './agragar-manicurista/agragar-manicurista.component';
const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'Login', component: LoginComponent },
  { path:'AgrManicurista', component:AgragarManicuristaComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
