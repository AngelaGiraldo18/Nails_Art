import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendacionCitasComponent } from './agendacion-citas.component';

describe('AgendacionCitasComponent', () => {
  let component: AgendacionCitasComponent;
  let fixture: ComponentFixture<AgendacionCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendacionCitasComponent]
    });
    fixture = TestBed.createComponent(AgendacionCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
