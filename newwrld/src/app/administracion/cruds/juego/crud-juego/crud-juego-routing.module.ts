import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudJuegoPage } from './crud-juego.page';

const routes: Routes = [
  {
    path: '',
    component: CrudJuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudJuegoPageRoutingModule {}
