import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSeguimientoComponent } from './register-seguimiento.component';

describe('RegisterSeguimientoComponent', () => {
  let component: RegisterSeguimientoComponent;
  let fixture: ComponentFixture<RegisterSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSeguimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
