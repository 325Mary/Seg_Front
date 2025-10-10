import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarCertificacionComponent } from './aprobar-certificacion.component';

describe('AprobarCertificacionComponent', () => {
  let component: AprobarCertificacionComponent;
  let fixture: ComponentFixture<AprobarCertificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobarCertificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarCertificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
