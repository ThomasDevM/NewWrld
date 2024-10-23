import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarCategoriaPageRoutingModule } from './listar-categoria-routing.module';

import { ListarCategoriaPage } from './listar-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarCategoriaPageRoutingModule
  ],
  declarations: [ListarCategoriaPage]
})
export class ListarCategoriaPageModule {}
