import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    title: 'Inicio',
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    loadComponent: () => import('./api/api.component'),
    children: [
      {
        title: 'Aleatorio',
        path: 'aleatorio',
        loadComponent: () => import('./api/pages/random/random.component').then(m => m.RandomComponent)
      },
      {
        title: 'Alcohol',
        path: 'alcohol',
        loadComponent: () => import('./api/pages/alcohol/alcohol.component').then(m => m.AlcoholComponent)
      },
      {
        path: 'bebida',
        loadComponent: () => import('./api/pages/drink/drink.component').then(m => m.DrinkComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
