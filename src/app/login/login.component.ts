import { Component } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import Swal from 'sweetalert2';

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

  constructor(private usuarioService: UsuarioService) {}

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
        });
      },
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
