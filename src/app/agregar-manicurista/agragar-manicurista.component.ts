import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agragar-manicurista',
  templateUrl: './agragar-manicurista.component.html',
  styleUrls: ['./agragar-manicurista.component.css']
})
export class AgragarManicuristaComponent {
  form: FormGroup;
  editMode = false;
  manicuristas: any[] = [];
  nombreABuscar: string = '';
  private searchTerm$ = new Subject<string>();

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      emailPersonal: ['', Validators.required],
      emailApp: ['', Validators.required],
      contrasenaApp: ['', Validators.required],
      celular: ['', Validators.required],
      direccion: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getManicuristas(); // Obtener manicuristas al iniciar el componente

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
  abrirModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

   onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.form.patchValue({ imagen: file });
    this.form.get('imagen')?.updateValueAndValidity();
  }

  cerrarModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  editarManicurista(manicurista: any): void {
    // Lógica para abrir un modal o navegar a la página de edición
    this.editMode = true;
    this.manicuristas = { ...manicurista };
    this.abrirModal();
  }

  eliminarManicurista(idmanicurista: number): void {
    if (!idmanicurista || idmanicurista <= 0) {
      console.error('ID del manicurista no válido:', idmanicurista);
      return; // No hagas la llamada si el ID no es válido
    }
  
    console.log('ID del manicurista:', idmanicurista);
    this.usuarioService.eliminarManicurista(idmanicurista).subscribe(
      (response) => {
        console.log('Manicurista eliminado con éxito:', response);
        this.getManicuristas(); // Actualiza la lista de manicuristas después de la eliminación
        Swal.fire({
          title: 'Éxito',
          text: 'Operación realizada con éxito.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        console.error('Error al eliminar el manicurista:', error);
        // Maneja el error según tus necesidades
        Swal.fire({
          title: 'Error',
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
          // Agrega lógica para mostrar el mensaje de error al usuario, si es necesario.
        }
      );
    } else {
      this.getManicuristas();
    }
  }
  
  registrarManicurista(): void {
    if (this.form.valid) {
      const formData = new FormData();
      Object.keys(this.form.value).forEach(key => {
        formData.append(key, this.form.value[key]);
      });

      const observable = this.editMode
        ? this.usuarioService.updateManicurista(formData)
        : this.usuarioService.createManicurista(formData);

      observable.subscribe(
        (response) => {
          console.log('Manicurista registrado/editado con éxito:', response);
          this.editMode = false;
          this.form.reset();
          this.cerrarModal();
          this.getManicuristas(); // Lógica para actualizar la lista de manicuristas
          Swal.fire({
            title: 'Éxito',
            text: 'Operación realizada con éxito.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          console.error('Error al registrar/editar manicurista:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al realizar la operación. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario no válido',
        text: 'Por favor, completa todos los campos correctamente.',
      });
    }
  }

  private getManicuristas(): void {
    this.usuarioService.getManicuristas().subscribe(
      (manicuristas) => {
        this.manicuristas = manicuristas;
      },
      (error) => {
        console.error('Error al obtener manicuristas:', error);
      }
    );
  }
}
