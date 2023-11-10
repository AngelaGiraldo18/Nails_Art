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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PrincipalComponent,
    FooterComponent,
    LoginComponent,
    AgragarManicuristaComponent,
    
  ],
  imports: [
    GravatarModule.forRoot({
      // Opciones de configuración (puedes personalizar según tus necesidades)
      size: 100,  // Tamaño predeterminado del avatar
      fallback: 'retro',  // Imagen predeterminada si Gravatar no tiene una asociada al correo electrónico
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule
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
