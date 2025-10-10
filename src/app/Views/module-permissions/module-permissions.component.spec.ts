import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulePermissionsComponent } from './module-permissions.component';

describe('ModulePermissionsComponent', () => {
  let component: ModulePermissionsComponent;
  let fixture: ComponentFixture<ModulePermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulePermissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
