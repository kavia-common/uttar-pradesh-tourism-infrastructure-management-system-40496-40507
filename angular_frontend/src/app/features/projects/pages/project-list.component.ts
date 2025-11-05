import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { ProjectService, Project } from '../services/project.service';

@Component({
  standalone: true,
  selector: 'app-project-list',
  imports: [RouterLink, NgFor],
  template: `
  <div class="card" style="margin-bottom:12px;display:flex;justify-content:space-between;align-items:center">
    <h2>Projects</h2>
    <a class="btn" routerLink="/projects/new">New Project</a>
  </div>
  <div class="card">
    <table class="table">
      <thead><tr><th>Name</th><th>Status</th><th>PM</th><th></th></tr></thead>
      <tbody>
        <tr *ngFor="let p of projects">
          <td>{{ p.name }}</td>
          <td>{{ p.status }}</td>
          <td>{{ p.manager }}</td>
          <td><a routerLink="/projects/{{p.id}}">Edit</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
})
export class ProjectListComponent {
  private svc = inject(ProjectService);
  projects: Project[] = [
    { id: 1, name: 'Tourist Facility, Ayodhya', status: 'In Progress', manager: 'PM Verma' },
    { id: 2, name: 'Ghats Renovation, Varanasi', status: 'Planning', manager: 'PM Mishra' },
  ];
  // Future: fetch from API via this.svc.list()
}
