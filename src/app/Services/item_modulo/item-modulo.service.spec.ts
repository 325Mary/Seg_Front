import { TestBed } from '@angular/core/testing';

import { ItemModuloService } from './item-modulo.service';

describe('ItemModuloService', () => {
  let service: ItemModuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemModuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
