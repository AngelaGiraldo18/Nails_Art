import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-opciones-manicura',
  templateUrl: './opciones-manicura.component.html',
  styleUrls: ['./opciones-manicura.component.css']
})
export class OpcionesManicuraComponent {
  @Output() tipoManicuraSeleccionada = new EventEmitter<string>();
  @Output() diaYHorarioSeleccionado = new EventEmitter<{ dia: string, horario: string }>();

  tipoManicuraSeleccionado: string | null = null;
  mostrarModal = false;
  mostrarManos = false;
  mostrarPies = false;
  manicuristas: any[] = [];


  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getManicuristas().subscribe(
      (manicuristas) => {
        this.manicuristas = manicuristas;
        debugger; // Establece un punto de interrupción aquí
      },
      (error) => {
        console.error('Error al obtener manicuristas:', error);
      }
    );
  }

  seleccionarTipoManicura(tipo: string): void {
    // Lógica para determinar duración y descripción según el tipo seleccionado
    let duracionEnManoHora = 0;
    let duracionEnPieHora = 0;
    let descripcion = '';
  
    switch (tipo) {
      case 'manos':
        duracionEnManoHora = 1.5;
        descripcion = 'Descripción para manos';
        break;
      case 'pies':
        duracionEnPieHora = 1;
        descripcion = 'Descripción para pies';
        break;
      case 'manosypies':
        duracionEnManoHora = 1;
        duracionEnPieHora = 1;
        descripcion = 'Descripción para manos y pies';
        break;
      default:
        // Tratamiento por defecto o manejo de errores
    }
  
    this.tipoManicuraSeleccionado = tipo;
    this.tipoManicuraSeleccionada.emit(tipo);
    this.mostrarModal = true;
  
    // Comentamos esta línea para usar la nueva función
    // this.usuarioService.createTipoUñas(data).subscribe(...
  
    // Llamamos a la nueva función
    this.registrarTipoUñas();
  }

  abrirManos(): void {
    this.mostrarManos = true;
  }

  abrirPies(): void {
    this.mostrarPies = true;
  }

  aceptarModal(opcion: string): void {
    console.log(`Opción seleccionada: ${opcion}`);

    this.diaYHorarioSeleccionado.emit({ dia: 'lunes', horario: '10:00 AM' });

    this.mostrarModal = false;
    this.mostrarManos = false;
    this.mostrarPies = false;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.mostrarManos = false;
    this.mostrarPies = false;
  }

  navegarASiguienteComponente(): void {
    this.router.navigate(['/seleccionar-horario']);
  }


registrarTipoUñas(): void {
  console.log('Intentando registrar tipo de uñas ', this.tipoManicuraSeleccionado);

  const duracionEnManoHora = 1.5; // Valores de duración en horas según tu lógica
  const duracionEnPieHora = 1;

  const descripcion = 'Descripción para ' + this.tipoManicuraSeleccionado;

  const data = {
    nombre: this.tipoManicuraSeleccionado,
    duracion_en_mano_hora: duracionEnManoHora,
    duracion_en_pie_hora: duracionEnPieHora,
    descripcion: descripcion,
  };

  const observable = this.usuarioService.createTipoUñas(data);

  observable.subscribe(
    (response) => {
      console.log('Tipo de uñas registrado con éxito:', response);
      this.mostrarModal = false;
      this.mostrarManos = false;
      this.mostrarPies = false;
      this.router.navigate(['/seleccionar-horario']); // O cualquier ruta que desees
    },
    (error) => {
      console.error('Error al registrar tipo de uñas:', error);
      // Manejar el error según tus necesidades
    }
  );
}

}
