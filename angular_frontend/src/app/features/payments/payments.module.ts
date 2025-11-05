import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
  <div class="card" style="margin-bottom:12px"><h2>Payments</h2></div>
  <div class="card">
    <table class="table">
      <thead><tr><th>Invoice</th><th>Contractor</th><th>Amount</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>INV-1001</td><td>ABC Constructions</td><td>₹ 12,50,000</td><td>Pending</td></tr>
      </tbody>
    </table>
  </div>
  `
})
export class PaymentsHomeComponent {}

export const PAYMENTS_ROUTES: Routes = [
  { path: '', component: PaymentsHomeComponent, title: 'Payments' },
];

export const PaymentsModule = { routes: PAYMENTS_ROUTES };
