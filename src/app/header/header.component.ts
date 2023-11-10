import { Component, HostListener, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioSharedServiceService } from '../serviceUsuarioSharedService/usuario-shared-service.service';
import { GravatarConfig } from 'ngx-gravatar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuarioInfo: any;
  isMenuOpen = false;
  gravatarConfig: GravatarConfig; // Agrega esta propiedad

  constructor(
    private usuarioService: UsuarioService,
    private usuarioSharedService: UsuarioSharedServiceService
  ) {
    // Obtén la configuración de Gravatar del servicio compartido
    this.gravatarConfig = this.usuarioSharedService.getGravatarConfig();
  }

  ngOnInit(): void {
    // Suscríbete al observable usuarioInfo$ para recibir actualizaciones
    this.usuarioService.usuarioInfo$.subscribe(usuario => {
      this.usuarioInfo = usuario;
    });

    this.checkWindowWidth();
  }

  openCloseMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.checkWindowWidth();
  }

  private checkWindowWidth(): void {
    if (window.innerWidth >= 760) {
      this.isMenuOpen = false;
    }
  }

  activoClass(event: MouseEvent): void {
    const elements = document.querySelectorAll('.lista3');
    elements.forEach((element) => element.classList.remove('activo'));
    (event.target as HTMLElement).classList.add('activo');
  }
}
