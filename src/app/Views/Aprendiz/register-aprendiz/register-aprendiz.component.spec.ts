import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAprendizComponent } from './register-aprendiz.component';

describe('RegisterAprendizComponent', () => {
  let component: RegisterAprendizComponent;
  let fixture: ComponentFixture<RegisterAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAprendizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
