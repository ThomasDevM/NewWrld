import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegaloPage } from './regalo.page';

const routes: Routes = [
  {
    path: '',
    component: RegaloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegaloPageRoutingModule {}
