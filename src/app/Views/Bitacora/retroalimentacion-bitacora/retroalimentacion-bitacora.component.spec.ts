import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroalimentacionBitacoraComponent } from './retroalimentacion-bitacora.component';

describe('RetroalimentacionBitacoraComponent', () => {
  let component: RetroalimentacionBitacoraComponent;
  let fixture: ComponentFixture<RetroalimentacionBitacoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetroalimentacionBitacoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroalimentacionBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
