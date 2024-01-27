import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-manicuristas',
  templateUrl: './manicuristas.component.html',
  styleUrls: ['./manicuristas.component.css']
})
export class ManicuristasComponent implements OnInit {
  manicuristas: any[] = [];
  selectedManicurista: any = null;

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

  openModal(manicurista: any): void {
    this.selectedManicurista = manicurista;
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'block';
    }
  }
  

  closeModal(): void {
    this.selectedManicurista = null;
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'none';
    }
  }
  
}
