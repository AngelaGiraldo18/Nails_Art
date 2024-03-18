import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agragar-manicurista',
  templateUrl: './agragar-manicurista.component.html',
  styleUrls: ['./agragar-manicurista.component.css']
})
export class AgragarManicuristaComponent implements OnInit {
  form: FormGroup;
  editMode = false;
  selectedFile: File | null = null;
  nombreABuscar: string = '';
  manicuristas: any[] = [];
  manicuristaId: number | null = null; 
  registrando = false;

  selectedFileName: string | null = null; 
  private searchTerm$ = new Subject<string>();

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.form = this.fb.group({
     id_manicurista:[''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      emailPersonal: ['', [Validators.required]],
      emailApp: ['', Validators.required],
      contrasenaApp: ['', Validators.required],
      celular: ['', Validators.required],
      direccion: ['', Validators.required],
      descripcion: [''],
      fotoManicurista: [null]
    });
    
  }

  ngOnInit(): void {
    this.getManicuristas();

    // Suscripción al observable searchTerm$
    this.searchTerm$
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.usuarioService.buscarManicuristasPorNombre(term))
    )
    .subscribe(
      (manicuristas) => {
        console.log('Manicuristas encontrados:', manicuristas);
        this.manicuristas = manicuristas;
      },
      (error) => {
        console.error('Error en la búsqueda de manicuristas:', error);
      }
    );
}
  abrirModal(): void {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
  
  cerrarModal(): void {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  onSubmit(): void {
  this.registrando = true;
  console.log('Intentando registrar/editar manicurista');
  if (this.form.valid) {
    // Verificar si se ha seleccionado un archivo
    if (!this.selectedFile) {
      Swal.fire({
        title: 'Archivo no válido',
        iconColor:'#631878',
        confirmButtonColor:'#631878',
        text: 'Por favor, selecciona una imagen antes de enviar el formulario.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return; // Detener el proceso de envío del formulario
    }

    const formData = new FormData();
    formData.append('id_manicurista', this.form.value.id_manicurista ?? '');
    formData.append('nombre', this.form.value.nombre);
    formData.append('apellido', this.form.value.apellido);
    formData.append('emailPersonal', this.form.value.emailPersonal);
    formData.append('emailApp', this.form.value.emailApp);
    formData.append('celular', this.form.value.celular);
    formData.append('direccion', this.form.value.direccion);
    formData.append('descripcion', this.form.value.descripcion);
    
    if (this.form.value.contrasenaApp) {
      formData.append('contrasenaApp', this.form.value.contrasenaApp);
    }
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }
    
    console.log('Datos a enviar:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    
    const observable = this.editMode
      ? this.usuarioService.updateManicurista(formData)
      : this.usuarioService.createManicurista(formData);

    observable.subscribe(
      (response) => {
        console.log('Manicurista registrado/editado con éxito:', response);
        this.form.reset();
        this.selectedFile = null;
        this.getManicuristas();
        Swal.fire({
          title: 'Éxito',
          iconColor:'#631878',
          text: 'Operación realizada con éxito.',
          icon: 'success',
          confirmButtonColor:'#631878',
          confirmButtonText: 'OK'
        });
        this.editMode = false;
        this.cerrarModal();
      },
      (error) => {
        console.error('Error al registrar/editar manicurista:', error);
        Swal.fire({
          title: 'Imagen no válida',
          iconColor:'#631878',
          confirmButtonColor:'#631878',
          text: 'La imagen que has seleccionado no es válida. Por favor, selecciona una imagen correcta.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
      }
    );
  } else {
    console.log('Formulario inválido:', this.form.errors);

    let errorMessage = 'Por favor, completa los siguientes campos:';
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.controls[controlName];
      if (control.invalid) {
        errorMessage += `\n- ${controlName}`;
      }
    });

    Swal.fire({
      title: 'Formulario no válido',
      iconColor:'#631878',
      confirmButtonColor:'#631878',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}

  
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) { // Comprobación de nulidad y longitud de archivos
      this.selectedFile = files[0];
      this.selectedFileName = this.selectedFile!.name; // Aserción de no nulidad
      console.log('Archivo seleccionado:', this.selectedFileName);
    }
  }


  editarManicurista(manicurista: any): void {
    this.editMode = true;
    this.manicuristaId = manicurista.id_manicurista;
    this.form.patchValue({
      id_manicurista: manicurista.id_manicurista,
      nombre: manicurista.nombre,
      apellido: manicurista.apellido,
      emailPersonal: manicurista.emailPersonal,
      emailApp: manicurista.emailApp,
      celular: manicurista.celular,
      direccion: manicurista.direccion,
      descripcion: manicurista.descripcion
    });
    this.abrirModal();
  }
  eliminarManicurista(idmanicurista: number): void {
    if (!idmanicurista || idmanicurista <= 0) {
      console.error('ID del manicurista no válido:', idmanicurista);
      return;
    }

    console.log('ID del manicurista:', idmanicurista);
    this.usuarioService.eliminarManicurista(idmanicurista).subscribe(
      (response) => {
        console.log('Manicurista eliminado con éxito:', response);
        this.getManicuristas();
        Swal.fire({
          title: 'Éxito',
          iconColor:'#631878',
          confirmButtonColor:'#631878',
          text: 'Operación realizada con éxito.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        console.error('Error al eliminar el manicurista:', error);
        Swal.fire({
          title: 'Error',
          iconColor:'#631878',
          confirmButtonColor:'#631878',
          text: 'Hubo un error al realizar la operación. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  onSearchTermChange(): void {
    if (this.nombreABuscar.trim() !== '') {
      this.usuarioService.buscarManicuristasPorNombre(this.nombreABuscar).subscribe(
        (manicuristas) => {
          console.log('Manicuristas encontrados:', manicuristas);
          this.manicuristas = manicuristas;
        },
        (error) => {
          console.error('Error en la búsqueda de manicuristas:', error);
        }
      );
    } else {
      this.getManicuristas();  // Si el campo está vacío, muestra todos los manicuristas
    }
  }
  buscarManicuristas(): void {
    if (this.nombreABuscar.trim() !== '') {
      this.usuarioService.buscarManicuristasPorNombre(this.nombreABuscar).subscribe(
        (manicuristas) => {
          console.log('Manicuristas encontrados:', manicuristas);
          this.manicuristas = manicuristas;
        },
        (error) => {
          console.error('Error en la búsqueda de manicuristas:', error);
        }
      );
    } else {
      this.getManicuristas();
    }
  }

  private getManicuristas(): void {
    this.usuarioService.getManicuristas().subscribe(
      (manicuristas) => {
        this.manicuristas = manicuristas;
        console.log("manicu",manicuristas);
        
      },
      (error) => {
        console.error('Error al obtener manicuristas:', error);
      }
    );
  }
}

