import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  
  manicuristaSeleccionada: { idmanicurista: number, nombre: string, favorito: boolean } | null = null;
  ubicacionServicio: string = '';
  duracionEnHoras: number = 0;
  opcionSeleccionada: string = ''; 
  modalAbierta: boolean = false;
  calendarioModalAbierta: boolean = false;
  siguienteHabilitado: boolean = false;
  usuarioInfo: any; 
  favoritoSeleccionado: boolean = false;
  horaSeleccionada: string = ''; 
  minutoSeleccionado: string = '';


  // Otras propiedades del componente
  @ViewChild('calendar') calendar!: CalendarWeekViewComponent;
  @ViewChild('fechaInput', { static: true }) fechaInput!: ElementRef;

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
        this.manicuristas = manicuristas.map(manicurista => ({ ...manicurista, favorito: false }));
        console.log('Manicuristas cargados:', this.manicuristas);
      },
      (error) => {
        console.error('Error al obtener manicuristas:', error);
      }
    );
    this.viewDate = new Date();
    
    this.usuarioService.usuarioInfo$.subscribe(usuario => {
      this.usuarioInfo = usuario;
    });
  }

  ngAfterViewInit() {
    this.fechaInput.nativeElement.value = this.formatDate(this.viewDate); // Inicializar el input con la fecha actual
  }

  seleccionarFecha(event: any): void {
    const fechaSeleccionadaString = event.target.value; // Obtener la fecha como una cadena de texto
    const fechaSeleccionada = new Date(fechaSeleccionadaString); // Convertir la cadena de texto a un objeto de tipo Date
    if (isNaN(fechaSeleccionada.getTime())) {
      console.error('La fecha seleccionada no es válida:', fechaSeleccionadaString);
      // Manejar el caso en que la fecha no sea válida, por ejemplo, mostrando un mensaje de error
      return;
    }
    this.viewDate = fechaSeleccionada; // Asignar la fecha seleccionada como un objeto de tipo Date
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
    const ubicacionSeleccionada = this.tipoServicioSeleccionado !== '';
    const manicuristaSeleccionada = this.manicuristaSeleccionada !== null;
    this.siguienteHabilitado = ubicacionSeleccionada && manicuristaSeleccionada;
  }  
  
  
  @Output() siguiente = new EventEmitter<void>();

  siguientePaso() {
    if (this.siguienteHabilitado) {
      if (!this.manicuristaSeleccionada || !('idmanicurista' in this.manicuristaSeleccionada)) {
        console.error('Manicurista seleccionado inválido');
        return;
      }
      const datosCita = {
        id_usuario: this.usuarioInfo.id, // Asegúrate de obtener el ID de usuario correctamente
        id_manicurista: this.manicuristaSeleccionada.idmanicurista, // Asignar correctamente el ID del manicurista seleccionado
        tipo_servicio: this.tipoServicioSeleccionado,
        ubicacion_servicio: this.ubicacionServicio,
        duracion_en_horas: this.duracionEnHoras,
        favorito: this.manicuristaSeleccionada.favorito,
        fecha_del_servicio: '', // Esto se establecerá más adelante
        estado: 'programada'
      };
  
      console.log('Datos de la cita:', datosCita);
  
      this.cerrarModal();
      this.abrirCalendarioModal();
    } 
  }
  
  

  agendarCita() {
    if (this.siguienteHabilitado) {
      // Obtener la fecha seleccionada del input
      const fechaSeleccionada = new Date(this.viewDate);
      
      // Obtener la hora y el minuto seleccionados
      const horaSeleccionada = this.horaSeleccionada ? parseInt(this.horaSeleccionada) : 0;
      const minutoSeleccionado = this.minutoSeleccionado ? parseInt(this.minutoSeleccionado) : 0;
      
      // Establecer la hora y el minuto en la fecha seleccionada
      fechaSeleccionada.setHours(horaSeleccionada, minutoSeleccionado);
      const datosCita = {
        id_usuario: this.usuarioInfo.id,
        id_manicurista: this.manicuristaSeleccionada?.idmanicurista, // Acceso seguro a la propiedad
        tipo_servicio: this.tipoServicioSeleccionado,
        ubicacion_servicio: this.ubicacionServicio,
        duracion_en_horas: this.duracionEnHoras,
        favorito: this.manicuristaSeleccionada?.favorito, // Acceso seguro a la propiedad
        fecha_del_servicio: fechaSeleccionada.toISOString(),
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
  
  formatDate(date: Date): string {
    // Formatear la fecha en formato 'yyyy-MM-dd'
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Agregar 1 al mes porque en JavaScript los meses van de 0 a 11
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
