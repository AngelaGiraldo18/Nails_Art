import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Observable, BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  imagenSeleccionada: File | null = null;
  imagenSeleccionadaURL: string | null = null;
  manicuristas: any[] = [];
  manicurista: any = {};
  value: number = 0;
  imagenesCatalogo: any[] = [];
  imagenesCatalogoSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getManicuristas().subscribe(
      (manicuristas) => {
        this.manicuristas = manicuristas;
        this.value = 1;
      },
      (error) => {
        console.error('Error al obtener manicuristas:', error);
      }
    );

    this.usuarioService.usuarioInfo$.subscribe(
      (usuarioInfo) => {
        if (usuarioInfo && usuarioInfo.rol === 'manicurista') {
          this.manicurista = usuarioInfo;
        }
      },
      (error) => {
        console.error('Error al obtener información del usuario:', error);
      }
    );

    // Suscribirse al BehaviorSubject para obtener las imágenes del catálogo
    this.imagenesCatalogoSubject.subscribe((imagenes) => {
      this.imagenesCatalogo = imagenes;
    });

    // Llamar a la función para cargar las imágenes del catálogo
    this.cargarImagenesCatalogo();
  }

  onFileSelected(event: any) {
    this.imagenSeleccionada = event.target.files[0];
    if (this.imagenSeleccionada) {
      this.imagenSeleccionadaURL = URL.createObjectURL(this.imagenSeleccionada);
    }
  }

  subirImagen() {
    if (this.imagenSeleccionada) {
      const idUsuario = this.usuarioService.getUsuarioInfo()?.id; // Obtén el ID de usuario desde tu servicio
      if (idUsuario) {
        const formData = new FormData(); // Crea un nuevo objeto FormData
        formData.append('imagen', this.imagenSeleccionada); // Adjunta la imagen al formulario
  
        this.usuarioService.agregarImagenCatalogo(idUsuario, formData)
          .subscribe(
            () => {
              console.log('Imagen agregada al catálogo correctamente.');
              Swal.fire({
                title: 'Éxito',
                text: 'La imagen se ha agregado al catálogo correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              // Llamar a la función para cargar las imágenes del catálogo después de agregar una imagen
              this.cargarImagenesCatalogo();
            },
            error => {
              console.error('Error al agregar la imagen al catálogo:', error);
              Swal.fire({
                title: 'Error',
                text: 'imagen no valida. Por favor, intenta con una imagen que corresponda a diseños de uñas.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          );
      } else {
        console.error('No se pudo obtener el ID de usuario.');
        // Aquí podrías manejar el caso en que no se pueda obtener el ID de usuario
      }
    } else {
      console.error('No se ha seleccionado ninguna imagen.');
      // Aquí podrías manejar el caso en que no se haya seleccionado ninguna imagen
    }
  }

  cargarImagenesCatalogo() {
    const idUsuario = this.usuarioService.getUsuarioInfo()?.id;
    if (idUsuario) {
      this.usuarioService.obtenerImagenesPorUsuario(idUsuario).subscribe(
        (imagenes) => {
          // Actualizar el BehaviorSubject con las imágenes obtenidas
          this.imagenesCatalogoSubject.next(imagenes);
        },
        (error) => {
          console.error('Error al obtener las imágenes del catálogo:', error);
        }
      );
    }
  }
}
