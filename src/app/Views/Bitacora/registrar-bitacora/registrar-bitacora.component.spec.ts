import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarBitacoraComponent } from './registrar-bitacora.component';

describe('RegistrarBitacoraComponent', () => {
  let component: RegistrarBitacoraComponent;
  let fixture: ComponentFixture<RegistrarBitacoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarBitacoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
