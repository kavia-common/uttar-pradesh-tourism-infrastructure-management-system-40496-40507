import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [NgFor],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  cards = [
    { title: 'Active Projects', value: 24 },
    { title: 'Open Tenders', value: 7 },
    { title: 'Inspections Due', value: 5 },
    { title: 'Pending Payments', value: 12 },
  ];
}
