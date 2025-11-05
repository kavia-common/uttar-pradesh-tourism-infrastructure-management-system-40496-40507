import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
  <div class="card" style="margin-bottom:12px"><h2>Contractors</h2></div>
  <div class="card">
    <table class="table">
      <thead><tr><th>Name</th><th>Category</th><th>Rating</th></tr></thead>
      <tbody>
        <tr><td>ABC Constructions</td><td>Civil</td><td>4.3</td></tr>
        <tr><td>XYZ Infra</td><td>Electrical</td><td>4.0</td></tr>
      </tbody>
    </table>
  </div>
  `
})
export class ContractorsHomeComponent {}

export const CONTRACTORS_ROUTES: Routes = [
  { path: '', component: ContractorsHomeComponent, title: 'Contractors' },
];

export const ContractorsModule = { routes: CONTRACTORS_ROUTES };
