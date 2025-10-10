import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydataaprendizComponent } from './mydataaprendiz.component';

describe('MydataaprendizComponent', () => {
  let component: MydataaprendizComponent;
  let fixture: ComponentFixture<MydataaprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MydataaprendizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MydataaprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
