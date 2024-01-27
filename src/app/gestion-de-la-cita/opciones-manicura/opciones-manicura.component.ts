import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { CalendarView, CalendarWeekViewComponent } from 'angular-calendar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-opciones-manicura',
  templateUrl: './opciones-manicura.component.html',
  styleUrls: ['./opciones-manicura.component.css']
})
export class OpcionesManicuraComponent implements OnInit {
  manicuristas: any[] = [];
  tipoServicioSeleccionado: string = '';
  manicuristaSeleccionada: any = null;
  ubicacionServicio: string = '';
  duracionEnHoras: number = 0;
  opcionSeleccionada: string = ''; 
  modalAbierta: boolean = false;
  calendarioModalAbierta: boolean = false;
  siguienteHabilitado: boolean = false;
  usuarioInfo: any; 
  favoritoSeleccionado: boolean = false;

  // Otras propiedades del componente
  @ViewChild('calendar') calendar!: CalendarWeekViewComponent;
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  startHour = 8;
  endHour = 18;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Obtén los manicuristas y la información del usuario
    this.usuarioService.getManicuristas().subscribe(
      (manicuristas) => {
        this.manicuristas = manicuristas;
      },
      (error) => {
        console.error('Error al obtener manicuristas:', error);
      }
    );

    this.usuarioService.usuarioInfo$.subscribe(usuario => {
      this.usuarioInfo = usuario;
    });
  }

  seleccionarFecha(event: any): void {
    const fechaSeleccionada = event.date;
    console.log('Fecha seleccionada:', fechaSeleccionada);  
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

  seleccionarManicurista(manicurista: any) {
    this.manicuristaSeleccionada = manicurista;
    this.verificarSeleccion();
  }

  marcarComoFavorita(manicurista: any) {
    manicurista.favorito = !manicurista.favorito;
    this.favoritoSeleccionado = manicurista.favorito; // Actualizar el valor en la propiedad del componente
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
    this.siguienteHabilitado = this.manicuristaSeleccionada !== null && this.tipoServicioSeleccionado !== '';
  }

  @Output() siguiente = new EventEmitter<void>();

  siguientePaso() {
    if (this.siguienteHabilitado) {
      const datosCita = {
        tipoServicio: this.tipoServicioSeleccionado,
        manicurista: this.manicuristaSeleccionada,
        ubicacionServicio: this.ubicacionServicio,
        duracionEnHoras: this.duracionEnHoras
      };
      this.cerrarModal();
      this.abrirCalendarioModal();
    }
  }

  agendarCita() {
    if (this.siguienteHabilitado) {
      const fechaSeleccionada = this.viewDate;
      const fechaServicio = `${fechaSeleccionada.toISOString().slice(0, 19).replace('T', ' ')}`;

      const datosCita = {
        id_usuario: this.usuarioInfo.id,
        id_manicurista: this.manicuristaSeleccionada.idmanicurista,
        tipo_servicio: this.tipoServicioSeleccionado,
        ubicacion_servicio: this.ubicacionServicio,
        duracion_en_horas: this.duracionEnHoras,
        favorito: this.favoritoSeleccionado,
        fecha_del_servicio: fechaServicio,
        estado: 'programada'
      };

      console.log('Datos de la cita a enviar:', datosCita);

      this.usuarioService.createCita(datosCita).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          Swal.fire('¡Cita agendada!', 'La cita se ha agendado correctamente.', 'success');
        },
        (error) => {
          console.error('Error al agendar la cita:', error);
          Swal.fire('Error', 'Hubo un problema al agendar la cita. Por favor, inténtalo de nuevo.', 'error');
        },
        () => {
          this.cerrarModal();
          this.abrirCalendarioModal();

          this.favoritoSeleccionado = true;
        }
      );
    }
  }
}
