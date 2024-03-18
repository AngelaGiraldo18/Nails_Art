import { Component } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  value: number = 0;
  manicuristas: any[] = [];
  manicurista: any = {};
  imagenes: string[] = ['leftarrow.svg', 'rightarrow.svg', 'IMG_20230418_142518.jpg', 'JuanEsteban.jpeg','foto-jesus.jpg','sergio.jpg','carlos.jpg'];

  constructor(private usuarioService: UsuarioService,public auth: AuthService) {}

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
