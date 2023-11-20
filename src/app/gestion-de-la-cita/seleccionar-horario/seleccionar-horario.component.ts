import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-seleccionar-horario',
  templateUrl: './seleccionar-horario.component.html',
  styleUrls: ['./seleccionar-horario.component.css']
})
export class SeleccionarHorarioComponent {
  @Output() diaYHorarioSeleccionado = new EventEmitter<{ dia: string, horario: string }>();

  seleccionarDiaYHorario(dia: string, horario: string): void {
    this.diaYHorarioSeleccionado.emit({ dia, horario });
  }
}
