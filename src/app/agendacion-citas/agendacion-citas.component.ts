import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agendacion-citas',
  templateUrl: './agendacion-citas.component.html',
  styleUrls: ['./agendacion-citas.component.css']
})
export class AgendacionCitasComponent implements OnInit {
  usuarioInfo: any;
  mostrarOpcionesManicura = false;
  mostrarSeleccionManicurista = false;
  mostrarSeleccionHorario = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Suscríbete al observable usuarioInfo$ para recibir actualizaciones
    this.usuarioService.usuarioInfo$.subscribe(usuario => {
      this.usuarioInfo = usuario;
    });
  }

  mostrarNuevaCita(): void {
    this.ocultarComponentes();
    this.mostrarOpcionesManicura = true;
  }

  mostrarGestionCitas(): void {
    this.ocultarComponentes();
    // Agrega lógica para mostrar la gestión de citas
  }

  mostrarHistorial(): void {
    this.ocultarComponentes();
    // Agrega lógica para mostrar el historial
  }

  mostrarFavoritos(): void {
    this.ocultarComponentes();
    // Agrega lógica para mostrar los favoritos
  }

  private ocultarComponentes(): void {
    this.mostrarOpcionesManicura = false;
    this.mostrarSeleccionManicurista = false;
    this.mostrarSeleccionHorario = false;
  }

  mostrarOpcionesManicuraClick(): void {
    this.ocultarComponentes();
    this.mostrarOpcionesManicura = true;
  }

  mostrarSeleccionHorarioClick(): void {
    this.ocultarComponentes();
    this.mostrarSeleccionHorario = true;
  }
}