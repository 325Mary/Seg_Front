import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCertificacionComponent } from './register-certificacion.component';

describe('RegisterCertificacionComponent', () => {
  let component: RegisterCertificacionComponent;
  let fixture: ComponentFixture<RegisterCertificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCertificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCertificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
