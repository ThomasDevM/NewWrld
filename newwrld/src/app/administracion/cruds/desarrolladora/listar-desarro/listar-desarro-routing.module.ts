import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarDesarroPage } from './listar-desarro.page';

const routes: Routes = [
  {
    path: '',
    component: ListarDesarroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarDesarroPageRoutingModule {}
