import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let token = localStorage.getItem('user_token');

  if (!token) {
    router.navigateByUrl('/');
    return false; // Prevent navigation to the protected route
  }

  return true; // Allow navigation
};
