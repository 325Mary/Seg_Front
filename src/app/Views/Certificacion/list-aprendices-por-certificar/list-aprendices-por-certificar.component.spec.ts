import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAprendicesPorCertificarComponent } from './list-aprendices-por-certificar.component';

describe('ListAprendicesPorCertificarComponent', () => {
  let component: ListAprendicesPorCertificarComponent;
  let fixture: ComponentFixture<ListAprendicesPorCertificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAprendicesPorCertificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAprendicesPorCertificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
