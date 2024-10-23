import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoBloqueadoPageRoutingModule } from './listado-bloqueado-routing.module';

import { ListadoBloqueadoPage } from './listado-bloqueado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoBloqueadoPageRoutingModule
  ],
  declarations: [ListadoBloqueadoPage]
})
export class ListadoBloqueadoPageModule {}
