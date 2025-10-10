import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroalimentacionSeguimientoComponent } from './retroalimentacion-seguimiento.component';

describe('RetroalimentacionSeguimientoComponent', () => {
  let component: RetroalimentacionSeguimientoComponent;
  let fixture: ComponentFixture<RetroalimentacionSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetroalimentacionSeguimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroalimentacionSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
