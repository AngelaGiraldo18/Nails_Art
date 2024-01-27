import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManicuristasComponent } from './manicuristas.component';

describe('ManicuristasComponent', () => {
  let component: ManicuristasComponent;
  let fixture: ComponentFixture<ManicuristasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManicuristasComponent]
    });
    fixture = TestBed.createComponent(ManicuristasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
