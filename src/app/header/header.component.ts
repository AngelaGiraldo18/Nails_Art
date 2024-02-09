import { Component, HostListener, OnInit,ElementRef } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioSharedServiceService } from '../serviceUsuarioSharedService/usuario-shared-service.service';
import { GravatarConfig } from 'ngx-gravatar';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  usuarioInfo: any;
  isMenuOpen = false;
  gravatarConfig: GravatarConfig;
  mostrarBotonCerrarSesion = false;

  constructor(
    private usuarioService: UsuarioService,
    private usuarioSharedService: UsuarioSharedServiceService,
    public auth: AuthService ,
    private el: ElementRef
  ) {
    // Obtén la configuración de Gravatar del servicio compartido
    this.gravatarConfig = this.usuarioSharedService.getGravatarConfig();
  }

  ngOnInit(): void {
    document.addEventListener('click', (event) => this.handleGlobalClick(event));
    // Suscríbete al observable usuarioInfo$ para recibir actualizaciones
    this.usuarioService.usuarioInfo$.subscribe(usuario => {
      this.usuarioInfo = usuario;
    });

    this.checkWindowWidth();
  }

  openCloseMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  handleGlobalClick(event: Event): void {
    const target = event.target as HTMLElement;
    // Verificar si el clic ocurrió en el icono de cierre (x)
    if (target.closest('.closeHeader')) {
    this.closeMenu();
    return;
  }
  
  // Verificar si el clic ocurrió fuera del menú y del header
  if (!this.el.nativeElement.contains(target) && !target.closest('.icon__menu')) {
    this.isMenuOpen = false;
  }
  }
  
  onMouseLeave(): void {
    this.mostrarBotonCerrarSesion = false;
  }

  ngOnDestroy() {
    // Eliminar los eventos de clic al destruir el componente para evitar fugas de memoria
    document.removeEventListener('click', (event) => this.handleGlobalClick(event));
  }

  closeMenu(): void {
    this.isMenuOpen = false;
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