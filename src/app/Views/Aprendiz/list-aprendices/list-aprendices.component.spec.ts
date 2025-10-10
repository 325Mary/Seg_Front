import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAprendicesComponent } from './list-aprendices.component';

describe('ListAprendicesComponent', () => {
  let component: ListAprendicesComponent;
  let fixture: ComponentFixture<ListAprendicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAprendicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAprendicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
