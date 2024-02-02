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
        // Maneja la respuesta exitosa aquí
        console.log('Inicio de sesión exitoso:', response);
        Swal.fire({
          title: 'Registro exitoso',
          text: 'El usuario inicio sesión correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.auth.login(response.token)
        this.router.navigate(['/'])


      },
      (error) => {
        // Maneja el error aquí
        console.error('Error al iniciar sesión:', error);
        if (error.status === 401) {
          // Puedes mostrar un mensaje específico para errores de autenticación
          console.error('Correo o contraseña incorrectos');
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al iniciar sesión el usuario. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          // Otro manejo de errores
          console.error('Error desconocido al iniciar sesión');
        }
      }
    );
  }
  
  registrarUsuario() {
    console.log('Intentando registrar usuario:', this.usuario);
    this.usuarioService.createUser(this.usuario).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito:', response);
        Swal.fire({
          title: 'Registro exitoso',
          text: 'El usuario se registró correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        
        
        this.isChecked = false;},
      (error) => {
        console.error('Error al registrar usuario:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}