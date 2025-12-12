import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroFormacionComponent } from './centro-formacion.component';

describe('CentroFormacionComponent', () => {
  let component: CentroFormacionComponent;
  let fixture: ComponentFixture<CentroFormacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroFormacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
