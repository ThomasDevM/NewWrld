import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoNoticiaPage } from './listado-noticia.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoNoticiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoNoticiaPageRoutingModule {}
