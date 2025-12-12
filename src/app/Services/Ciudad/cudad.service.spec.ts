import { TestBed } from '@angular/core/testing';

import { CudadService } from './cudad.service';

describe('CudadService', () => {
  let service: CudadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CudadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
