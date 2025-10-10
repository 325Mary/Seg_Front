import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMisAsignadosComponent } from './lista-mis-asignados.component';

describe('ListaMisAsignadosComponent', () => {
  let component: ListaMisAsignadosComponent;
  let fixture: ComponentFixture<ListaMisAsignadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMisAsignadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMisAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
