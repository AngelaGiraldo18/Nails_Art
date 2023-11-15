import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agendacion-citas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agendacion-citas.component.html',
  styleUrls: ['./agendacion-citas.component.css']
})
export class AgendacionCitasComponent  {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    // Aquí puedes cargar eventos desde tu servidor si es necesario
  ];

  constructor(private modal: NgbModal) {}

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (events.length > 0) {
      // Aquí puedes manejar la lógica de mostrar la modal y cargar las horas disponibles para el día seleccionado
      this.openModal(date);
    }
  }

  openModal(date: Date): void {
    const modalRef = this.modal.open(this.modalContent, { centered: true });
    // Aquí puedes pasar datos a la modal si es necesario
    modalRef.componentInstance.date = date;
  }
}
