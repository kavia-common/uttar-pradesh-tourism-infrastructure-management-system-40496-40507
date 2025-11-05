import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
  <div class="card" style="margin-bottom:12px"><h2>Reports</h2></div>
  <div class="card">
    <p class="muted">Generate custom reports by date, project, contractor, fund utilization, and milestones.</p>
  </div>
  `
})
export class ReportsHomeComponent {}

export const REPORTS_ROUTES: Routes = [
  { path: '', component: ReportsHomeComponent, title: 'Reports' },
];

export const ReportsModule = { routes: REPORTS_ROUTES };
