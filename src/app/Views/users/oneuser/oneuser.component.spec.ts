import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneuserComponent } from './oneuser.component';

describe('OneuserComponent', () => {
  let component: OneuserComponent;
  let fixture: ComponentFixture<OneuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
