import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionAprendizComponent } from './informacion-aprendiz.component';

describe('InformacionAprendizComponent', () => {
  let component: InformacionAprendizComponent;
  let fixture: ComponentFixture<InformacionAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionAprendizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
