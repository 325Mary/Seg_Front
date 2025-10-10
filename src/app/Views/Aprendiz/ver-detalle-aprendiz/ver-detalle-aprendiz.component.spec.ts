import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleAprendizComponent } from './ver-detalle-aprendiz.component';

describe('VerDetalleAprendizComponent', () => {
  let component: VerDetalleAprendizComponent;
  let fixture: ComponentFixture<VerDetalleAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDetalleAprendizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
