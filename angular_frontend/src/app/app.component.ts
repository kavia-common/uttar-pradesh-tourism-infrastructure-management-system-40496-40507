import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UP Tourism Infrastructure Management';
  private router = inject(Router);
  protected auth = inject(AuthService);

  isAuthRoute = false;

  constructor() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.isAuthRoute = e.urlAfterRedirects.startsWith('/login');
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
