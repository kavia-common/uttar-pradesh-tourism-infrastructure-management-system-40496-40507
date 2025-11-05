import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

type LoginResponse = {
  token: string;
  role: 'Admin' | 'PM' | 'Engineer' | 'Auditor';
  username: string;
};

const TOKEN_KEY = 'upstdc_jwt';
const ROLE_KEY = 'upstdc_role';
const USER_KEY = 'upstdc_user';

function isBrowser(): boolean {
  return typeof globalThis !== 'undefined' && typeof (globalThis as any).document !== 'undefined';
}
function getStorage(): any | null {
  const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : null;
  return isBrowser() && g && g.localStorage ? g.localStorage : null;
}
function safeBtoa(v: string): string {
  const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : null;
  return isBrowser() && g && typeof g.btoa === 'function' ? g.btoa(v) : 'b64';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  // PUBLIC_INTERFACE
  login(username: string, password: string) {
    /** Mock login for now: assign role by simple rule; store token in localStorage */
    const role: LoginResponse['role'] =
      username.toLowerCase().includes('admin')
        ? 'Admin'
        : username.toLowerCase().includes('pm')
        ? 'PM'
        : username.toLowerCase().includes('audit')
        ? 'Auditor'
        : 'Engineer';

    const response: LoginResponse = {
      token: `mock-jwt.${safeBtoa(username)}.${Date.now()}`,
      role,
      username,
    };

    const ls = getStorage();
    if (ls) {
      ls.setItem(TOKEN_KEY, response.token);
      ls.setItem(ROLE_KEY, response.role);
      ls.setItem(USER_KEY, response.username);
    }

    this.router.navigateByUrl('/');
  }

  // PUBLIC_INTERFACE
  logout() {
    /** Clear auth storage and redirect to login */
    const ls = getStorage();
    if (ls) {
      ls.removeItem(TOKEN_KEY);
      ls.removeItem(ROLE_KEY);
      ls.removeItem(USER_KEY);
    }
    this.router.navigateByUrl('/login');
  }

  // PUBLIC_INTERFACE
  getToken(): string | null {
    /** Returns stored JWT token or null */
    const ls = getStorage();
    return ls ? ls.getItem(TOKEN_KEY) : null;
  }

  // PUBLIC_INTERFACE
  isAuthenticated(): boolean {
    /** Returns true if a token is present */
    return !!this.getToken();
  }

  // PUBLIC_INTERFACE
  getRole(): LoginResponse['role'] | null {
    /** Returns the stored role */
    const ls = getStorage();
    return (ls?.getItem(ROLE_KEY) as LoginResponse['role']) || null;
  }

  // PUBLIC_INTERFACE
  hasRole(roles: string[] | undefined): boolean {
    /** Checks if current role is in allowed roles */
    if (!roles || roles.length === 0) return true;
    const r = this.getRole();
    return r ? roles.includes(r) : false;
  }
}
