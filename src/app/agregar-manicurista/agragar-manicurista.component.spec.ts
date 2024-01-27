import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgragarManicuristaComponent } from './agragar-manicurista.component';

describe('AgragarManicuristaComponent', () => {
  let component: AgragarManicuristaComponent;
  let fixture: ComponentFixture<AgragarManicuristaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgragarManicuristaComponent]
    });
    fixture = TestBed.createComponent(AgragarManicuristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
