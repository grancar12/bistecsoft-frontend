import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./modules/auth/register/register')
      .then(m => m.RegisterComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/components/sidebar/sidebar')
      .then(m => m.SidebarComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard')
          .then(m => m.DashboardComponent)
      },
      {
        path: 'clientes',
        loadComponent: () => import('./modules/clientes/clientes-lista/clientes-lista')
          .then(m => m.ClientesListaComponent)
      },
      {
        path: 'clientes/nuevo',
        loadComponent: () => import('./modules/clientes/clientes-form/clientes-form')
          .then(m => m.ClientesFormComponent)
      },
      {
        path: 'clientes/editar/:id',
        loadComponent: () => import('./modules/clientes/clientes-form/clientes-form')
          .then(m => m.ClientesFormComponent)
      },
      {
        path: 'productos',
        loadComponent: () => import('./modules/productos/productos-lista/productos-lista')
          .then(m => m.ProductosListaComponent)
      },
      {
        path: 'productos/nuevo',
        loadComponent: () => import('./modules/productos/productos-form/productos-form')
          .then(m => m.ProductosFormComponent)
      },
      {
        path: 'productos/editar/:id',
        loadComponent: () => import('./modules/productos/productos-form/productos-form')
          .then(m => m.ProductosFormComponent)
      },
      {
        path: 'ventas',
        loadComponent: () => import('./modules/ventas/ventas-lista/ventas-lista')
          .then(m => m.VentasListaComponent)
      },
      {
        path: 'ventas/nueva',
        loadComponent: () => import('./modules/ventas/ventas-form/ventas-form')
          .then(m => m.VentasFormComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
