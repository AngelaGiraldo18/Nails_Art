import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechasAgendadasComponent } from './fechas-agendadas.component';

describe('FechasAgendadasComponent', () => {
  let component: FechasAgendadasComponent;
  let fixture: ComponentFixture<FechasAgendadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FechasAgendadasComponent]
    });
    fixture = TestBed.createComponent(FechasAgendadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
