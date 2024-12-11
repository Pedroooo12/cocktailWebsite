import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    title: 'Inicio',
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
