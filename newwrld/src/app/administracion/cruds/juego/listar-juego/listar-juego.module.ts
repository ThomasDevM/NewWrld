import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarJuegoPageRoutingModule } from './listar-juego-routing.module';

import { ListarJuegoPage } from './listar-juego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarJuegoPageRoutingModule
  ],
  declarations: [ListarJuegoPage]
})
export class ListarJuegoPageModule {}
