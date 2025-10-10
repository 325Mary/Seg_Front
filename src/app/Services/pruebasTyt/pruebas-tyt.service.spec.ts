import { TestBed } from '@angular/core/testing';

import { PruebasTytService } from './pruebas-tyt.service';

describe('PruebasTytService', () => {
  let service: PruebasTytService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PruebasTytService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
