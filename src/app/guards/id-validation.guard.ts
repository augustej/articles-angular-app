import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const IdValidationGuard: CanActivateFn = (route, state) => {
  const id = route.paramMap.get('id');
  if (!id) return true;

  const isValidId = parseInt(id) < 200;

  if (!isValidId) {
    return inject(Router).createUrlTree(['/not-found']);
  }
  return true;
};
