import { Component ,OnInit} from '@angular/core';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-fechas-agendadas',
  templateUrl: './fechas-agendadas.component.html',
  styleUrls: ['./fechas-agendadas.component.css']
})
export class FechasAgendadasComponent implements OnInit{
  manicuristas: any[] = [];
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getManicuristas().subscribe(
      (manicuristas) => {
        this.manicuristas = manicuristas;
        debugger; // Punto de interrupción
      },
      (error) => {
        console.error('Error al obtener manicuristas:', error);
      }
    );
  }
}
