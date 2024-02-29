import { Component } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import{ AuthService } from '../Auth/auth.service'
import { UsuarioSharedServiceService } from '../serviceUsuarioSharedService/usuario-shared-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isChecked = false;
  usuario = {
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    rol: 'cliente'
  };
  usuarioLg = {
    email: '',
    contrasena: '',
  };

  constructor(private usuarioService: UsuarioService, public auth: AuthService,private usuarioSharedService: UsuarioSharedServiceService,private router: Router) {}

  iniciarSesion() {
    console.log('Intentando iniciar sesión:', this.usuarioLg);
    this.usuarioService.loginUser(this.usuarioLg.email, this.usuarioLg.contrasena).subscribe(
      (response:any) => {
        this.auth.login(response.token)
        this.router.navigate(['/Inicio']);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        if (error.status === 401) {
          console.error('Correo o contraseña incorrectos');
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al iniciar sesión el usuario. Por favor, inténtalo de nuevo.',
            icon: 'error',
            iconColor: '#631878',
            confirmButtonColor: '#631878'
          });
        }
      }
    );
  }
  
  registrarUsuario() {
    console.log('Intentando registrar usuario:', this.usuario);
    this.usuarioService.createUser(this.usuario).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito:', response);
        // Después de registrar, inicia sesión
        this.usuarioService.loginUser(this.usuario.email, this.usuario.contrasena).subscribe(
          (loginResponse:any) => {
            console.log('Inicio de sesión exitoso después del registro:', loginResponse);
            this.auth.login(loginResponse.token)
            this.router.navigate(['/Inicio']);
          },
          (loginError) => {
            console.error('Error al iniciar sesión después del registro:', loginError);
          }
        );
  
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.',
          icon: 'error',
        });
      }
    );
  }  
}