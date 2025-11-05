import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

// PUBLIC_INTERFACE
export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  /** Guard that checks if current user role matches allowed roles from route data.roles */
  const auth = inject(AuthService);
  const router = inject(Router);
  const roles = (route.data?.['roles'] as string[]) || [];
  if (auth.hasRole(roles)) return true;
  router.navigate(['/']);
  return false;
};
