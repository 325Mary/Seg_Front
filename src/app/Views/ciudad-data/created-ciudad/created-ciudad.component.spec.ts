import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedCiudadComponent } from './created-ciudad.component';

describe('CreatedCiudadComponent', () => {
  let component: CreatedCiudadComponent;
  let fixture: ComponentFixture<CreatedCiudadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedCiudadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
