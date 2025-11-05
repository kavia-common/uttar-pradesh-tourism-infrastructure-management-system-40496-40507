import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
  <div class="card" style="margin-bottom:12px"><h2>Funds</h2></div>
  <div class="card">
    <table class="table">
      <thead><tr><th>Project</th><th>Allocated</th><th>Utilized</th></tr></thead>
      <tbody>
        <tr><td>Ayodhya</td><td>₹ 5 Cr</td><td>₹ 2.1 Cr</td></tr>
        <tr><td>Varanasi</td><td>₹ 3 Cr</td><td>₹ 0.6 Cr</td></tr>
      </tbody>
    </table>
  </div>
  `
})
export class FundsHomeComponent {}

export const FUNDS_ROUTES: Routes = [
  { path: '', component: FundsHomeComponent, title: 'Funds' },
];

export const FundsModule = { routes: FUNDS_ROUTES };
