import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoportePage } from './soporte.page';

const routes: Routes = [
  {
    path: '',
    component: SoportePage
  },  {
    path: 'comentarios-app',
    loadChildren: () => import('./comentarios-app/comentarios-app.module').then( m => m.ComentariosAppPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoportePageRoutingModule {}
