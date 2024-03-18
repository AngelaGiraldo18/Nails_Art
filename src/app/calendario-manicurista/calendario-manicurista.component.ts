import { Component ,OnInit,Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { UsuarioService } from '../service/usuario.service';
import { AuthService } from '../Auth/auth.service';
@Component({
  selector: 'app-calendario-manicurista',
  templateUrl: './calendario-manicurista.component.html',
  styleUrls: ['./calendario-manicurista.component.css']
})
export class CalendarioManicuristaComponent {
  viewDate: Date = new Date();
  selectedDate!: Date;
  availableHours: { hour: number; reserved: boolean }[] = [];
  mensajesPorDia: { [fecha: string]: string } = {};
  @Input() showHeader: boolean = true;

  constructor(public auth:AuthService,public dialog: MatDialog, private usuarioService: UsuarioService) {}
  openModal(citas: any[]): void {
    this.dialog.open(ModalComponent, {
      data: {
        selectedDate: this.selectedDate,
        citas: citas
      }
    });
  }


  onDayClick(day: any): void {
    this.selectedDate = day.date;
    console.log('Fecha seleccionada:', this.formatoFecha(this.selectedDate));
    const id_manicurista: number = this.auth.id();
    const rol: string= this.auth.rol()
    this.usuarioService.obtenerCitasPorFecha(this.formatoFecha(this.selectedDate),id_manicurista,rol).subscribe(
        (citas) => {
            console.log('Citas para la fecha seleccionada:', citas);
            this.openModal(citas);
        },
        (error) => {
            console.error('Error al obtener citas:', error);
        }
    );
}


  // Método para actualizar las horas disponibles según las citas obtenidas
  actualizarHorasDisponibles(citas: any[]): void {
    // Implementa la lógica para actualizar las horas disponibles según las citas
    // Puedes comparar con las citas obtenidas y marcar las horas reservadas
    // Ejemplo simple: Marcamos como reservadas las horas en las que hay citas
    this.availableHours = this.getAvailableHoursForDate(this.selectedDate)
      .map(hour => ({ ...hour, reserved: citas.some(cita => cita.hora === hour.hour) }));
  }

  // ... otros métodos del componente ...

  formatoFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();
  
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
  
    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  
  getAvailableHoursForDate(date: Date): { hour: number; reserved: boolean }[] {
    // Lógica para obtener las horas disponibles para el día seleccionado
    // Debes implementar esto según tus necesidades
    return [
      // Datos de ejemplo
      { hour: 8, reserved: true },
      { hour: 9, reserved: true },
      { hour: 10, reserved: false },
      { hour: 11, reserved: false },
      { hour: 12, reserved: true },
      { hour: 13, reserved: true },
      { hour: 14, reserved: true },
      { hour: 15, reserved: true },
      { hour: 16, reserved: false },
      { hour: 17, reserved: false },
      { hour: 18, reserved: true }
    ];
  }
}