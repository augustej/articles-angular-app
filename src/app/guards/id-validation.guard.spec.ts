import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { idValidationGuard } from './id-validation.guard';

describe('idValidationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => idValidationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
