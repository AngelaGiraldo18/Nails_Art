import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  form: FormGroup;
  processing: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      hojaVidaFile: [null, Validators.required],
      aceptoPrivacidad: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.form.valid && !this.processing) {
      this.processing = true;

      const formData = new FormData();
      const formValue = this.form.value;

      Object.keys(formValue).forEach(key => {
        if (key === 'hojaVidaFile' && formValue[key]) {
          formData.append('hojaVidaFile', formValue[key], formValue[key].name);
        } else {
          formData.append(key, formValue[key]);
        }
      });

      // Obtén el valor del campo de correo electrónico
      const email = this.form.get('email')?.value;

      // Realiza la llamada al servicio para crear el empleado candidato
      this.usuarioService.createEmpleadoCandidato(formData).subscribe(
        response => {
          console.log('Empleado candidato creado correctamente', response);
          // Muestra una alerta de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Datos enviados!',
            text: 'Los datos se han enviado correctamente.',
          });

          // Llamada para enviar el correo electrónico con los datos
          this.usuarioService.sendEmailWithEmpleadosData(email).subscribe(
            emailResponse => {
              console.log('Correo electrónico enviado correctamente', emailResponse);
              // Restablece el formulario y el estado de procesamiento
              this.form.reset();
              this.processing = false;
            },
            emailError => {
              console.error('Error al enviar el correo electrónico', emailError);
              // Muestra una alerta de error en el envío del correo
              Swal.fire({
                icon: 'error',
                title: 'Error al enviar el correo electrónico',
                text: 'Por favor, inténtalo de nuevo.',
              });
              this.processing = false;
            }
          );
        },
        error => {
          console.error('Error al crear el empleado candidato', error);
          // Muestra una alerta de error en la creación del empleado candidato
          Swal.fire({
            icon: 'error',
            title: 'Error al crear el empleado candidato',
            text: 'Por favor, inténtalo de nuevo.',
          });
          this.processing = false;
        }
      );
    } else {
      console.log('El formulario no es válido');
      // Muestra una alerta de error si el formulario no es válido
      Swal.fire({
        icon: 'error',
        title: 'Formulario no válido',
        text: 'Por favor, completa todos los campos correctamente.',
      });
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  onFileSelected(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.form.patchValue({ hojaVidaFile: file });
      this.form.get('hojaVidaFile')?.updateValueAndValidity();
    }
  }
}
