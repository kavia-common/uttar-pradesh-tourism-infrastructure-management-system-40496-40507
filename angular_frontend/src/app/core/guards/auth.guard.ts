import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

// PUBLIC_INTERFACE
export const AuthGuard: CanActivateFn = () => {
  /** Guard that allows navigation only when user is authenticated */
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated()) return true;
  router.navigate(['/login']);
  return false;
};
