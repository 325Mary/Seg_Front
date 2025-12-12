import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCentrosComponent } from './create-centros.component';

describe('CreateCentrosComponent', () => {
  let component: CreateCentrosComponent;
  let fixture: ComponentFixture<CreateCentrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCentrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
