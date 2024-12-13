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
      },
      {
        title: "Tipo vaso",
        path: 'tipo-vaso',
        loadComponent: () => import('./api/pages/glass/glass.component').then(m => m.GlassComponent)
      },
      {
        title: "Ingredientes",
        path: 'ingredientes',
        loadComponent: () => import('./api/pages/ingredient/ingredient.component').then(m => m.IngredientComponent)
      },
      {
        title: "Nombre",
        path: 'nombre',
        loadComponent: () => import('./api/pages/name/name.component').then(m => m.NameComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
