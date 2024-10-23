import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GifcardPage } from './gifcard.page';

const routes: Routes = [
  {
    path: '',
    component: GifcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GifcardPageRoutingModule {}
