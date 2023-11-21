import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';

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
              this.errorMessage = 'Error al enviar el correo electrónico. Por favor, inténtalo de nuevo.';
              this.processing = false;
            }
          );
        },
        error => {
          console.error('Error al crear el empleado candidato', error);
          this.errorMessage = 'Error al crear el empleado candidato. Por favor, inténtalo de nuevo.';
          this.processing = false;
        }
      );
    } else {
      console.log('El formulario no es válido');
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
