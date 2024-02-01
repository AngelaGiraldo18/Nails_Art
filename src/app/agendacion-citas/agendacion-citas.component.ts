import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
@Component({
  selector: 'app-agendacion-citas',
  templateUrl: './agendacion-citas.component.html',
  styleUrls: ['./agendacion-citas.component.css']
})
export class AgendacionCitasComponent implements OnInit {
    usuarioInfo: any;
    opcionSeleccionada: string = '';
  
    constructor(private usuarioService: UsuarioService) {}
  
    ngOnInit(): void {
      this.usuarioService.usuarioInfo$.subscribe(usuario => {
        this.usuarioInfo = usuario;
      });
    }
  
    seleccionarNuevaCita() {
      this.opcionSeleccionada = 'nuevaCita';
      console.log('Opción seleccionada:', this.opcionSeleccionada);
    }
  
    seleccionarCitasAgendadas() {
      this.opcionSeleccionada = 'citasAgendadas';
      console.log('Opción seleccionada:', this.opcionSeleccionada);
    }
  
    seleccionarHistorial() {
      this.opcionSeleccionada = 'historial';
      console.log('Opción seleccionada:', this.opcionSeleccionada);
    }
  
    seleccionarFavoritos() {
      this.opcionSeleccionada = 'favoritos';
      console.log('Opción seleccionada:', this.opcionSeleccionada);
    }
  
    mostrarSeleccionarHorario() {
      this.opcionSeleccionada = 'seleccionarHorario';
    }    
    
}