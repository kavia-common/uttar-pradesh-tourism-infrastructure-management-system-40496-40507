import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
  <div class="card" style="margin-bottom:12px"><h2>Handover</h2></div>
  <div class="card">
    <p class="muted">Track handover readiness, documents, and sign-offs.</p>
  </div>
  `
})
export class HandoverHomeComponent {}

export const HANDOVER_ROUTES: Routes = [
  { path: '', component: HandoverHomeComponent, title: 'Handover' },
];

export const HandoverModule = { routes: HANDOVER_ROUTES };
