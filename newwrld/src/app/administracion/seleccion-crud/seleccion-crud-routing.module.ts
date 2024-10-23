import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionCrudPage } from './seleccion-crud.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionCrudPageRoutingModule {}
