import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleDesarroPageRoutingModule } from './detalle-desarro-routing.module';

import { DetalleDesarroPage } from './detalle-desarro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleDesarroPageRoutingModule
  ],
  declarations: [DetalleDesarroPage]
})
export class DetalleDesarroPageModule {}
