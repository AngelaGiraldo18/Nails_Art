// FavoritosComponent
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favoritasManicuristas: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.usuarioInfo$.subscribe(usuarioInfo => {
      if (usuarioInfo && usuarioInfo.email) {
        const userEmail = usuarioInfo.email;
        this.obtenerFavoritasManicuristas(userEmail);
      } else {
        console.error('No hay información de usuario disponible.');
      }
    });
  }

  obtenerFavoritasManicuristas(userEmail: string) {
    this.usuarioService.getFavoritaManicuristas(userEmail).subscribe(
      (favoritasManicuristas) => {
        console.log('Manicuristas favoritas recibidas:', favoritasManicuristas);
        this.favoritasManicuristas = favoritasManicuristas;
      },
      (error) => {
        console.error('Error al obtener las manicuristas favoritas:', error);
      }
    );
  }
}
