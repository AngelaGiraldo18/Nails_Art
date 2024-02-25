import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  citas: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerCitas();
  }

  obtenerCitas(): void {
    const fecha: string = this.data.selectedDate.toISOString().split('T')[0];
    this.usuarioService.obtenerCitasPorFecha(fecha).subscribe(
      (citas) => {
        this.citas = citas.map(cita => ({ ...cita, canceladaVisible: true }));
      },
      (error) => {
        console.error('Error al obtener las citas:', error);
      }
    );
  }

  cambiarEstado(idCita: number, nuevoEstado: string, index: number): void {
    this.usuarioService.cambiarEstadoCita(idCita, nuevoEstado).subscribe(
      (response) => {
        console.log('Estado de la cita cambiado correctamente:', response);
        if (nuevoEstado === 'realizada') {
          this.citas[index].estado = 'realizada';
          // Ocultar el botón "Cancelada" correspondiente
          this.citas[index].canceladaVisible = false;
        }
      },
      (error) => {
        console.error('Error al cambiar el estado de la cita:', error);
      }
    );
  }

  eliminarCita(index: number): void {
    this.citas.splice(index, 1);
  }
}