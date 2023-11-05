import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  


  ngOnInit(): void {
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
