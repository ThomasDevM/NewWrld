import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleDesarroPage } from './detalle-desarro.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleDesarroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleDesarroPageRoutingModule {}
