import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarrEpsComponent } from './editarr-eps.component';

describe('EditarrEpsComponent', () => {
  let component: EditarrEpsComponent;
  let fixture: ComponentFixture<EditarrEpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarrEpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarrEpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
