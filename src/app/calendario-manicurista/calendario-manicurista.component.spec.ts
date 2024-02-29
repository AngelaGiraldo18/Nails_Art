import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioManicuristaComponent } from './calendario-manicurista.component';

describe('CalendarioManicuristaComponent', () => {
  let component: CalendarioManicuristaComponent;
  let fixture: ComponentFixture<CalendarioManicuristaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioManicuristaComponent]
    });
    fixture = TestBed.createComponent(CalendarioManicuristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
