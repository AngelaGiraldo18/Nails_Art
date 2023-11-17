import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarHorarioComponent } from './seleccionar-horario.component';

describe('SeleccionarHorarioComponent', () => {
  let component: SeleccionarHorarioComponent;
  let fixture: ComponentFixture<SeleccionarHorarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionarHorarioComponent]
    });
    fixture = TestBed.createComponent(SeleccionarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
