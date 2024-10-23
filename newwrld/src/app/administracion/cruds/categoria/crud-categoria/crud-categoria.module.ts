import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudCategoriaPageRoutingModule } from './crud-categoria-routing.module';

import { CrudCategoriaPage } from './crud-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudCategoriaPageRoutingModule
  ],
  declarations: [CrudCategoriaPage]
})
export class CrudCategoriaPageModule {}
