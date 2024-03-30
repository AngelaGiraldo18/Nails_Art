import { Component, OnInit } from '@angular/core';
import { UsuarioService,  } from '../service/usuario.service';
import { BehaviorSubject,Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import {  ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manicuristas',
  templateUrl: './manicuristas.component.html',
  styleUrls: ['./manicuristas.component.css']
})
export class ManicuristasComponent implements OnInit {
  @ViewChild('carouselInner') carouselInner: ElementRef | undefined;
  interval: any;
  currentIndex = 0;
  manicuristas: any[] = [];
  selectedManicurista: any = null;
   id_manicurista:number |null =null;
  imagenesCatalogoSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
 

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getManicuristas().subscribe(
      (manicuristas) => {
        this.manicuristas = manicuristas;
        console.log("foto",manicuristas);
        // Punto de interrupción
      },
      (error) => {
        console.error('Error al obtener manicuristas:', error);
      }
    );


  


    
  }

  openModal(manicurista: any): void {
    this.selectedManicurista = manicurista;
    console.log(this.selectedManicurista.id_manicurista);
    this.pauseCarousel();
    
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'block';

    }


    
    
    const id=this.selectedManicurista.id_manicurista
    this.id_manicurista=id
    console.log("id",id);
    
      if (id) {
        this.imagenesCatalogoSubject.next([]);
        this.usuarioService.obtenerImagenesPorUsuario(id).subscribe(
          (imagenes) => {
            // Actualizar el BehaviorSubject con las imágenes obtenidas
            console.log("imagenes", imagenes);
            
            this.imagenesCatalogoSubject.next(imagenes);
            if (imagenes.length > 0) {
              this.startCarousel(); // Iniciar el carrusel solo si hay imágenes disponibles
            }
            
            
          },
          (error) => {
            console.error('Error al obtener las imágenes del catálogo:', error);
          }
        );
      }
  }
  

  closeModal(): void {
    this.selectedManicurista = null;
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'none';
      this.pauseCarousel()
    }
    this. startCarousel()
  }

  startCarousel(): void {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 1000);
  }

  pauseCarousel(): void {
    clearInterval(this.interval);
    this.currentIndex=0;
  }

  nextSlide(): void {
    const images = this.imagenesCatalogoSubject.getValue(); 
    this.currentIndex = (this.currentIndex + 1) % images.length; 
    this.slideToCurrentIndex();
  }

  slideToCurrentIndex(): void {
    if (this.carouselInner) {
      const carouselWidth = this.carouselInner.nativeElement.offsetWidth;
      this.carouselInner.nativeElement.style.transform = `translateX(-${this.currentIndex * carouselWidth}px)`;
    }
  }

  


}
  

