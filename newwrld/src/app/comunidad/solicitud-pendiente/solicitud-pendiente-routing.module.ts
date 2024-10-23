import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudPendientePage } from './solicitud-pendiente.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudPendientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudPendientePageRoutingModule {}
