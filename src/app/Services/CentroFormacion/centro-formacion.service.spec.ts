import { TestBed } from '@angular/core/testing';

import { CentroFormacionService } from './centro-formacion.service';

describe('CentroFormacionService', () => {
  let service: CentroFormacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroFormacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
