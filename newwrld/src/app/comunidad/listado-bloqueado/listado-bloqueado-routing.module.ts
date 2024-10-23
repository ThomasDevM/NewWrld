import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoBloqueadoPage } from './listado-bloqueado.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoBloqueadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoBloqueadoPageRoutingModule {}
