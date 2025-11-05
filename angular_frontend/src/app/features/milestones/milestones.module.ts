import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
  <div class="card" style="margin-bottom:12px"><h2>Milestones</h2></div>
  <div class="card">
    <table class="table">
      <thead><tr><th>Project</th><th>Milestone</th><th>Due</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>Ayodhya</td><td>Foundation</td><td>15 May</td><td>Completed</td></tr>
        <tr><td>Varanasi</td><td>Survey</td><td>30 May</td><td>Pending</td></tr>
      </tbody>
    </table>
  </div>
  `
})
export class MilestonesHomeComponent {}

export const MILESTONES_ROUTES: Routes = [
  { path: '', component: MilestonesHomeComponent, title: 'Milestones' },
];

export const MilestonesModule = { routes: MILESTONES_ROUTES };
