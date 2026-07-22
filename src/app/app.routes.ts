import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing').then((m) => m.Landing),
  },
  {
    path: 'what-is-this',
    loadComponent: () => import('./pages/what-is-this/what-is-this').then((m) => m.WhatIsThis),
  },
  {
    path: 'lets-get-into-it',
    loadComponent: () => import('./pages/hub/hub').then((m) => m.Hub),
  },
  {
    path: 'lets-get-into-it/ganduri/:id',
    loadComponent: () =>
      import('./pages/ganduri-detail/ganduri-detail').then((m) => m.GanduriDetail),
  },
  {
    path: 'ilovelips',
    loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
