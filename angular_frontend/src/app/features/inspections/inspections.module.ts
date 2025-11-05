import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
  <div class="card" style="margin-bottom:12px"><h2>Inspections</h2></div>
  <div class="card">
    <table class="table">
      <thead><tr><th>Project</th><th>Inspector</th><th>Date</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>Ayodhya</td><td>Er. Singh</td><td>12 May</td><td>Scheduled</td></tr>
      </tbody>
    </table>
  </div>
  `
})
export class InspectionsHomeComponent {}

export const INSPECTIONS_ROUTES: Routes = [
  { path: '', component: InspectionsHomeComponent, title: 'Inspections' },
];

export const InspectionsModule = { routes: INSPECTIONS_ROUTES };
