import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydatauserComponent } from './mydatauser.component';

describe('MydatauserComponent', () => {
  let component: MydatauserComponent;
  let fixture: ComponentFixture<MydatauserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MydatauserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MydatauserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
