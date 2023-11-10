import { Component } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import Swal from 'sweetalert2';
import { UsuarioSharedServiceService } from '../serviceUsuarioSharedService/usuario-shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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

  constructor(private usuarioService: UsuarioService, private usuarioSharedService: UsuarioSharedServiceService) {}

  iniciarSesion() {
    console.log('Intentando iniciar sesión:', this.usuarioLg);
    this.usuarioService.loginUser(this.usuarioLg.email, this.usuarioLg.contrasena).subscribe(
      (response) => {
        // Maneja la respuesta exitosa aquí
        console.log('Inicio de sesión exitoso:', response);
        Swal.fire({
          title: 'Registro exitoso',
          text: 'El usuario inicio sesión correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

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
        });},
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