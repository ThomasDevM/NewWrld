import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirAmigoPage } from './anadir-amigo.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirAmigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirAmigoPageRoutingModule {}
