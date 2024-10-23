import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaJuegoPage } from './pagina-juego.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaJuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaJuegoPageRoutingModule {}
