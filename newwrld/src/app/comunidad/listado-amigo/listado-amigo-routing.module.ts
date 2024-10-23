import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoAmigoPage } from './listado-amigo.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoAmigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoAmigoPageRoutingModule {}
