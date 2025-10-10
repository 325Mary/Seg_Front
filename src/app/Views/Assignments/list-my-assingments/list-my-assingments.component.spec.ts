import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyAssingmentsComponent } from './list-my-assingments.component';

describe('ListMyAssingmentsComponent', () => {
  let component: ListMyAssingmentsComponent;
  let fixture: ComponentFixture<ListMyAssingmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMyAssingmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMyAssingmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
