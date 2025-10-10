import { TestBed } from '@angular/core/testing';

import { AprendizService } from './aprendiz.service';

describe('AprendizService', () => {
  let service: AprendizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AprendizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
