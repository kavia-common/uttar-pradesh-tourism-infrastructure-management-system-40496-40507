import { Routes } from '@angular/router';
import { MapViewComponent } from './components/map-view.component';

export const PROGRESS_ROUTES: Routes = [
  { path: '', component: MapViewComponent, title: 'Progress Map' },
];

export const ProgressModule = { routes: PROGRESS_ROUTES };
