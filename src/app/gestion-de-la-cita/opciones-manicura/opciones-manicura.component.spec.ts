import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesManicuraComponent } from './opciones-manicura.component';

describe('OpcionesManicuraComponent', () => {
  let component: OpcionesManicuraComponent;
  let fixture: ComponentFixture<OpcionesManicuraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpcionesManicuraComponent]
    });
    fixture = TestBed.createComponent(OpcionesManicuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
