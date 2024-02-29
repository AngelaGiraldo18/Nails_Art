import { Component } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  value: number = 0;
  manicuristas: any[] = [];
  imagenes: string[] = ['leftarrow.svg', 'rightarrow.svg', 'IMG_20230418_142518.jpg', 'JuanEsteban.jpeg','foto-jesus.jpg','sergio.jpg','carlos.jpg'];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getManicuristas().subscribe(
      (manicuristas) => {
        this.manicuristas = manicuristas;
        console.log("manicuristas", manicuristas);
        this.value = 1; // Inicializar el valor para mostrar el primer testimonio
      },
      (error) => {
        console.error('Error al obtener manicuristas:', error);
      }
    );
  }

  onNextButtonClick() {
    this.changePosition(1);
  }

  onBeforeButtonClick() {
    this.changePosition(-1);
  }

  changePosition(add: number) {
    this.value += add;

    if (this.value > this.manicuristas.length) {
      this.value = 1;
    } else if (this.value < 1) {
      this.value = this.manicuristas.length;
    }
  }
}
