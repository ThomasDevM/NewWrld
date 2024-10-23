import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirAmigoPageRoutingModule } from './anadir-amigo-routing.module';

import { AnadirAmigoPage } from './anadir-amigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnadirAmigoPageRoutingModule
  ],
  declarations: [AnadirAmigoPage]
})
export class AnadirAmigoPageModule {}
