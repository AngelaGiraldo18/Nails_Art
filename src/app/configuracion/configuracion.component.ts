import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  modalAbierta: boolean = false;
  servicios: any[] = [];
  nuevoServicio: any = {};
  nuevoPrecio: number | undefined;
  OtraModal: boolean = false;
  servicioSeleccionado: any;

  constructor(private miServicio: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerServicios();
  }

  abrirModal() {
    this.modalAbierta = true;
  }
  cerrarModal() {
    this.modalAbierta = false;
  }
  otraModal(servicio: any){
    this.servicioSeleccionado = servicio;
    this.OtraModal = true;
  }
  
  cerrarOtraModal(){
    this.OtraModal = false
  }

  obtenerServicios() {
    this.miServicio.getConfiguracion().subscribe(
      (data: any) => {
        this.servicios = data.servicios;
      },
      (error) => {
        console.error('Error al obtener los servicios:', error);
      }
    );
  }

  actualizarPrecio(idServicio: number, nuevoPrecio: number) {
    this.miServicio.actualizarPrecioServicio(idServicio, nuevoPrecio).subscribe(
      (response: any) => {
        console.log('Precio del servicio actualizado:', response);
        this.obtenerServicios();
      },
      (error) => {
        console.error('Error al actualizar el precio del servicio:', error);
      }
    );
  }
  
  

  onSubmitForm() {
    this.miServicio.createServicio(this.nuevoServicio).subscribe(
      (response: any) => {
        console.log('Servicio creado:', response);
        this.obtenerServicios();
        this.nuevoServicio = {};
        this.cerrarModal();
        
      },
      (error) => {
        console.error('Error al crear el servicio:', error);
      }
    );
  }
}
