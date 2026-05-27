// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Rutas públicas (sin sidebar)
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login/login').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./modules/auth/register/register').then(m => m.RegisterComponent),
  },

  // Rutas protegidas (con sidebar via LayoutComponent)
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/layout/layout').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/dashboard/dashboard').then(m => m.DashboardComponent),
      },

      // Clientes
      {
        path: 'clientes',
        loadComponent: () =>
          import('./modules/clientes/clientes-lista/clientes-lista')
            .then(m => m.ClientesListaComponent),
      },
      {
        path: 'clientes/nuevo',
        loadComponent: () =>
          import('./modules/clientes/clientes-form/clientes-form')
            .then(m => m.ClientesFormComponent),
      },
      {
        path: 'clientes/:id/editar',
        loadComponent: () =>
          import('./modules/clientes/clientes-form/clientes-form')
            .then(m => m.ClientesFormComponent),
      },

      // Productos
      {
        path: 'productos',
        loadComponent: () =>
          import('./modules/productos/productos-lista/productos-lista')
            .then(m => m.ProductosListaComponent),
      },
      {
        path: 'productos/nuevo',
        loadComponent: () =>
          import('./modules/productos/productos-form/productos-form')
            .then(m => m.ProductosFormComponent),
      },
      {
        path: 'productos/:id/editar',
        loadComponent: () =>
          import('./modules/productos/productos-form/productos-form')
            .then(m => m.ProductosFormComponent),
      },

      // Ventas
      {
        path: 'ventas',
        loadComponent: () =>
          import('./modules/ventas/ventas-lista/ventas-lista')
            .then(m => m.VentasListaComponent),
      },
      {
        path: 'ventas/nueva',
        loadComponent: () =>
          import('./modules/ventas/ventas-form/ventas-form')
            .then(m => m.VentasFormComponent),
      },

      // Ingresos
      {
        path: 'ingresos',
        loadComponent: () =>
          import('./modules/ingresos-lista/ingresos-lista')
            .then(m => m.IngresosListaComponent),
      },
    ]
  },

  { path: '**', redirectTo: '/dashboard' },
];