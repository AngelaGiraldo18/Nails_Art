import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-header-responsive',
  templateUrl: './header-responsive.component.html',
  styleUrls: ['./header-responsive.component.css']
})
export class HeaderResponsiveComponent {
  showMenu = false;
  @ViewChild('menu', { static: true }) menu!: ElementRef;

  constructor(public auth: AuthService) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }
}
