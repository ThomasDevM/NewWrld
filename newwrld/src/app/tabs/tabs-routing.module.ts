import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tienda',
        loadChildren: () => import('../menu/tienda/tienda.module').then(m => m.TiendaPageModule)
      },
      {
        path: 'notificaciones',
        loadChildren: () => import('../tab/notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule)
      },
      {
        path: 'noticias',
        loadChildren: () => import('../tab/noticias/noticias.module').then(m => m.NoticiasPageModule)
      },
      {
        path: 'config',
        loadChildren: () => import('../tab/config/config.module').then(m => m.ConfigPageModule)
      },
      {
        path: 'regalo',
        loadChildren: () => import('../tab/regalo/regalo.module').then(m => m.RegaloPageModule)
      },
      {
        path: '',
        redirectTo: '/tab/notificaciones',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tienda',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class TabsPageRoutingModule {}
