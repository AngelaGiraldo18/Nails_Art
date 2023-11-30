import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PrincipalComponent } from './principal/principal.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {UsuarioService}  from './service/usuario.service';
import { GravatarModule } from 'ngx-gravatar';
import { AuthInterceptor } from './auth.interceptor';
import { AgragarManicuristaComponent } from './agragar-manicurista/agragar-manicurista.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { AgendacionCitasComponent } from './agendacion-citas/agendacion-citas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ModalComponent } from './modal/modal.component';
import { CalendarioManicuristaComponent } from './calendario-manicurista/calendario-manicurista.component';
import { OpcionesManicuraComponent } from './gestion-de-la-cita/opciones-manicura/opciones-manicura.component';
import { ContactoComponent } from './contacto/contacto.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PrincipalComponent,
    FooterComponent,
    LoginComponent,
    AgragarManicuristaComponent,
    GaleriaComponent,
    AgendacionCitasComponent,
    ModalComponent,
    CalendarioManicuristaComponent,
    OpcionesManicuraComponent,
    ContactoComponent,
  ],
  imports: [
    GravatarModule.forRoot({
      // Opciones de configuración (puedes personalizar según tus necesidades)
      size: 100,  // Tamaño predeterminado del avatar
      fallback: 'retro',  // Imagen predeterminada si Gravatar no tiene una asociada al correo electrónico
    }),
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  providers: [
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
