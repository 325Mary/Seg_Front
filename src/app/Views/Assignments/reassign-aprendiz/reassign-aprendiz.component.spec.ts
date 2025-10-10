import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignAprendizComponent } from './reassign-aprendiz.component';

describe('ReassignAprendizComponent', () => {
  let component: ReassignAprendizComponent;
  let fixture: ComponentFixture<ReassignAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReassignAprendizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
