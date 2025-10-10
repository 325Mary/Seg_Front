import { TestBed } from '@angular/core/testing';

import { GuardRolesGuard } from './guard-roles.guard';

describe('GuardRolesGuard', () => {
  let guard: GuardRolesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardRolesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
