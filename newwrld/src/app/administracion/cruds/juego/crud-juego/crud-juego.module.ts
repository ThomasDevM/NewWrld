import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudJuegoPageRoutingModule } from './crud-juego-routing.module';

import { CrudJuegoPage } from './crud-juego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudJuegoPageRoutingModule
  ],
  declarations: [CrudJuegoPage]
})
export class CrudJuegoPageModule {}
