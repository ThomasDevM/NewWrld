import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarDesarroPageRoutingModule } from './agregar-desarro-routing.module';

import { AgregarDesarroPage } from './agregar-desarro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarDesarroPageRoutingModule
  ],
  declarations: [AgregarDesarroPage]
})
export class AgregarDesarroPageModule {}
