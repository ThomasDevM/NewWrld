import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudCategoriaPage } from './crud-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: CrudCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudCategoriaPageRoutingModule {}
