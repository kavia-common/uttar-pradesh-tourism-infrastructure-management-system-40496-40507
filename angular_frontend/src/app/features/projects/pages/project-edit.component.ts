import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-project-edit',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
  <div class="card" style="margin-bottom:12px">
    <h2>{{ id ? 'Edit Project' : 'New Project' }}</h2>
  </div>
  <form class="card form" [formGroup]="form" (ngSubmit)="save()">
    <label>
      <span>Name</span>
      <input formControlName="name" />
    </label>

    <label>
      <span>Status</span>
      <select formControlName="status">
        <option>Planning</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
    </label>

    <label>
      <span>Project Manager</span>
      <input formControlName="manager" />
    </label>

    <div class="actions">
      <button class="btn" type="submit" [disabled]="form.invalid">Save</button>
      <a routerLink="/projects" class="btn btn-outline">Cancel</a>
    </div>
  </form>
  `,
})
export class ProjectEditComponent {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  id = this.route.snapshot.paramMap.get('id');

  form = this.fb.group({
    name: ['', Validators.required],
    status: ['Planning', Validators.required],
    manager: ['', Validators.required],
  });

  save() {
    // Future: call service to save
    this.router.navigate(['/projects']);
  }
}
