import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarDesarroPage } from './agregar-desarro.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarDesarroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarDesarroPageRoutingModule {}
