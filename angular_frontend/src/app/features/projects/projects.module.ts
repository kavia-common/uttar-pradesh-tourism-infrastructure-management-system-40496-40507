import { Routes } from '@angular/router';
import { ProjectListComponent } from './pages/project-list.component';
import { ProjectEditComponent } from './pages/project-edit.component';

export const PROJECTS_ROUTES: Routes = [
  { path: '', component: ProjectListComponent, title: 'Projects' },
  { path: 'new', component: ProjectEditComponent, title: 'New Project' },
  { path: ':id', component: ProjectEditComponent, title: 'Edit Project' },
];
