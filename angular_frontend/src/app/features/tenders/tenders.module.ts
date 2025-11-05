import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
  <div class="card" style="margin-bottom:12px"><h2>Tenders</h2></div>
  <div class="card">
    <table class="table">
      <thead><tr><th>Tender No</th><th>Project</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>TND-001</td><td>Ayodhya Facility</td><td>Open</td></tr>
        <tr><td>TND-002</td><td>Varanasi Ghats</td><td>Closed</td></tr>
      </tbody>
    </table>
  </div>
  `
})
export class TendersHomeComponent {}

export const TENDERS_ROUTES: Routes = [
  { path: '', component: TendersHomeComponent, title: 'Tenders' },
];

export const TendersModule = {
  routes: TENDERS_ROUTES
};
