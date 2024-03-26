import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-fechas-agendadas',
  templateUrl: './fechas-agendadas.component.html',
  styleUrls: ['./fechas-agendadas.component.css']
})
export class FechasAgendadasComponent implements OnInit {
  citas: any[] = [];
  usuarioId: number = 0; 

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Obtener la información del usuario
    const usuarioInfo = this.usuarioService.getUsuarioInfo();
    
    // Verificar si hay información de usuario
    if (usuarioInfo) {
      // Si hay información de usuario, obtener su ID
      this.usuarioId = usuarioInfo.id; // Asumiendo que el ID del usuario está almacenado en un campo llamado 'id'
      
      // Usar el ID del usuario para obtener las citas
      this.usuarioService.obtenerHistorialCitasUsuario(this.usuarioId).subscribe(
        (citas) => {
          this.citas = citas;
          console.log('Citas del usuario:', this.citas);
        },
        (error) => {
          console.error('Error al obtener citas:', error);
        }
      );
    } else {
      console.error('No se encontró información de usuario.');
    }
  }
}