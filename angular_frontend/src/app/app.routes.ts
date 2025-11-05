import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },

  { path: '', component: DashboardComponent, canActivate: [AuthGuard], title: 'Dashboard' },

  {
    path: 'projects',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/projects/projects.module').then((m) => m.PROJECTS_ROUTES),
  },
  {
    path: 'tenders',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'PM'] },
    loadChildren: () =>
      import('./features/tenders/tenders.module').then((m) => m.TENDERS_ROUTES),
  },
  {
    path: 'contractors',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'PM', 'Engineer'] },
    loadChildren: () =>
      import('./features/contractors/contractors.module').then((m) => m.CONTRACTORS_ROUTES),
  },
  {
    path: 'funds',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'PM'] },
    loadChildren: () =>
      import('./features/funds/funds.module').then((m) => m.FUNDS_ROUTES),
  },
  {
    path: 'milestones',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'PM', 'Engineer'] },
    loadChildren: () =>
      import('./features/milestones/milestones.module').then((m) => m.MILESTONES_ROUTES),
  },
  {
    path: 'progress',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'PM', 'Engineer'] },
    loadChildren: () =>
      import('./features/progress/progress.module').then((m) => m.PROGRESS_ROUTES),
  },
  {
    path: 'inspections',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'Engineer'] },
    loadChildren: () =>
      import('./features/inspections/inspections.module').then((m) => m.INSPECTIONS_ROUTES),
  },
  {
    path: 'handover',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'PM'] },
    loadChildren: () =>
      import('./features/handover/handover.module').then((m) => m.HANDOVER_ROUTES),
  },
  {
    path: 'payments',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'PM', 'Auditor'] },
    loadChildren: () =>
      import('./features/payments/payments.module').then((m) => m.PAYMENTS_ROUTES),
  },
  {
    path: 'reports',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'PM', 'Auditor'] },
    loadChildren: () =>
      import('./features/reports/reports.module').then((m) => m.REPORTS_ROUTES),
  },

  { path: '**', redirectTo: '' },
];
