import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAprendicesComponent } from './reporte-aprendices.component';

describe('ReporteAprendicesComponent', () => {
  let component: ReporteAprendicesComponent;
  let fixture: ComponentFixture<ReporteAprendicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteAprendicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAprendicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
