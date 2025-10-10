import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNovedadComponent } from './register-novedad.component';

describe('RegisterNovedadComponent', () => {
  let component: RegisterNovedadComponent;
  let fixture: ComponentFixture<RegisterNovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNovedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
