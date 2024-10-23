import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarDesarroPageRoutingModule } from './listar-desarro-routing.module';

import { ListarDesarroPage } from './listar-desarro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarDesarroPageRoutingModule
  ],
  declarations: [ListarDesarroPage]
})
export class ListarDesarroPageModule {}
