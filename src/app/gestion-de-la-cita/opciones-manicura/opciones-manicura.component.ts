import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { CalendarView, CalendarWeekViewComponent } from 'angular-calendar';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-opciones-manicura',
  templateUrl: './opciones-manicura.component.html',
  styleUrls: ['./opciones-manicura.component.css']
})
export class OpcionesManicuraComponent implements OnInit {
  // Propiedades del componente
  manicuristas: any[] = [];
  servicios: any[] = [];
  filas: any[] = [];
  tipoServicioSeleccionado: string = '';
  manicuristaSeleccionada: { id_manicurista: number, nombre: string, favorito: boolean } | null = null;
  ubicacionServicio: string = '';
  duracionEnHoras: number = 0;
  opcionSeleccionada: string = '';
  modalAbierta: boolean = false;
  calendarioModalAbierta: boolean = false;
  siguienteHabilitado: boolean = false;
  usuarioInfo: any;
  favoritoSeleccionado: boolean = false;
  fechaHoraSeleccionada: string = '';
  horaSeleccionada: string = ''; 
  horasDisponibles: string[] = [];
  
  // Otras propiedades del componente
  @ViewChild('calendar') calendar!: CalendarWeekViewComponent;
  @ViewChild('fechaInput', { static: true }) fechaInput!: ElementRef;


  constructor(private usuarioService: UsuarioService, private datePipe: DatePipe) {}
  
  ngOnInit(): void {
    // Obtener los manicuristas y la información del usuario
    this.usuarioService.getManicuristas().subscribe(
      (manicuristas) => {
        this.manicuristas = manicuristas.map(manicurista => ({ ...manicurista, favorito: false }));
        console.log('Manicuristas cargados:', this.manicuristas);
      },
      (error) => {
        console.error('Error al obtener manicuristas:', error);
      }
    );
    this.usuarioService.usuarioInfo$.subscribe(usuario => {
      this.usuarioInfo = usuario;
    });
    
    this.usuarioService.getConfiguracion().subscribe(
      (response) => {
        console.log('Response:', response);
        if (Array.isArray(response.servicios)) {
          this.servicios = response.servicios;
          console.log('Servicios cargados:', this.servicios);
          // Dividir los servicios en filas
          this.filas = this.chunkArray(this.servicios, 4);
          console.log('Filas:', this.filas);
        } else {
          console.error('La propiedad servicios de la respuesta de getConfiguracion no es un arreglo:', response.servicios);
        }
      },
      (error) => {
        console.error('Error al obtener servicios:', error);
      }
    );    
    this.actualizarHorasDisponibles();

  }
  actualizarHorasDisponibles() {
    const horasDisponibles = [];
    for (let i = 9; i <= 17; i++) {
      const hora = i < 10 ? `0${i}:00` : `${i}:00`; // Formato HH:00
      horasDisponibles.push(hora);
    }
    this.horasDisponibles = horasDisponibles;
    this.horaSeleccionada = this.horasDisponibles[0];
  }

  chunkArray(arr: any[], size: number): any[] {
    const newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

  abrirModal(tipoServicio: string) {
    this.tipoServicioSeleccionado = tipoServicio;
    this.modalAbierta = true;
  }

  abrirCalendarioModal() {
    this.calendarioModalAbierta = true;
  }

  cerrarModal() {
    this.modalAbierta = false;
  }

  cerrarCalendarioModal() {
    this.calendarioModalAbierta = false;
  }
  cerrarTodasModales() {
    this.modalAbierta = false;
    this.calendarioModalAbierta = false;
  }

  seleccionarManicurista(manicurista: any) {
    this.manicuristaSeleccionada = manicurista;
    this.verificarSeleccion();
  }
  marcarComoFavorita(manicurista: any) {
    manicurista.favorito = !manicurista.favorito;
    console.log('Manicurista después de marcar como favorito:', manicurista);
    console.log('Valor de favorito después de hacer clic:', manicurista.favorito);
  }
  

  seleccionarTipoServicio(tipoServicio: string) {
    this.ubicacionServicio = tipoServicio;
    this.calcularDuracionEnHoras();
    this.verificarSeleccion();
    this.opcionSeleccionada = tipoServicio;
    console.log('Tipo de servicio seleccionado:', tipoServicio);
  }

  calcularDuracionEnHoras() {
    if (this.tipoServicioSeleccionado === 'Tradicional') {
      this.duracionEnHoras = (this.ubicacionServicio === 'manos' || this.ubicacionServicio === 'pies') ? 1 : 2;
    } else if (this.tipoServicioSeleccionado === 'Semipermanente') {
      this.duracionEnHoras = (this.ubicacionServicio === 'manos') ? 2 : 1.5;
    } else if (this.tipoServicioSeleccionado === 'Acrilicas') {
      this.duracionEnHoras = (this.ubicacionServicio === 'manos') ? 3 : 2.5;
    }
  }

  verificarSeleccion() {
    // Verificar si tanto la ubicación como la manicurista han sido seleccionadas y que la manicurista no sea null
    this.siguienteHabilitado = !!this.tipoServicioSeleccionado && !!this.manicuristaSeleccionada && !!this.ubicacionServicio;
  }
  

  @Output() siguiente = new EventEmitter<void>();
  siguientePaso() {
    if (this.siguienteHabilitado) {
      if (!this.manicuristaSeleccionada || !('idmanicurista' in this.manicuristaSeleccionada)) {
        console.error('Manicurista seleccionado inválido');
        return;
      }
      const datosCita = {
        id_usuario: this.usuarioInfo.id,
        id_manicurista: this.manicuristaSeleccionada.idmanicurista,
        tipo_servicio: this.tipoServicioSeleccionado,
        ubicacion_servicio: this.ubicacionServicio,
        duracion_en_horas: this.duracionEnHoras,
        favorito: this.manicuristaSeleccionada.favorito,
        fecha_del_servicio: this.fechaHoraSeleccionada, // Usar la fecha y hora seleccionadas
        estado: 'programada'
      };

      console.log('Datos de la cita:', datosCita);

      this.cerrarModal();
      this.abrirCalendarioModal();
    }
  }

  agendarCita() {
    if (this.siguienteHabilitado) {
      // Obtener la fecha y hora seleccionadas del input
      const fechaHoraSeleccionada = new Date(this.fechaHoraSeleccionada);
      const datosCita = {
        id_usuario: this.usuarioInfo.id,
        id_manicurista: this.manicuristaSeleccionada?.id_manicurista,
        tipo_servicio: this.tipoServicioSeleccionado,
        ubicacion_servicio: this.ubicacionServicio,
        duracion_en_horas: this.duracionEnHoras,
        favorito: this.manicuristaSeleccionada?.favorito,
        fecha_del_servicio: this.formatDateTime(fechaHoraSeleccionada), // Formatear fecha y hora seleccionadas
        estado: 'programada'
      };
      console.log('Datos de la cita a enviar:', datosCita);

      this.usuarioService.createCita(datosCita).subscribe(
        (response) => {
          Swal.fire({
            title: '¡Cita agendada!',
            text: 'La cita se ha agendado correctamente.',
            icon: 'success',
            iconColor: '#631878'
          });
          
        },
        (error) => {
          console.error('Error al agendar la cita:', error);
          Swal.fire('Error', 'Hubo un problema al agendar la cita. Por favor, inténtalo de nuevo.', 'error');
        },
        () => {
          this.cerrarModal();
          this.abrirCalendarioModal();
          this.cerrarTodasModales();
          this.favoritoSeleccionado = true;
        }
      );
    }
  }

  formatDateTime(date: any): string {
    if (!(date instanceof Date)) {
      console.error('El valor proporcionado no es una instancia de Date:', date);
      return ''; // O manejar el error de otra manera
    }
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss', 'America/Bogota');
    return formattedDate ? formattedDate : '';
  }
  
}
