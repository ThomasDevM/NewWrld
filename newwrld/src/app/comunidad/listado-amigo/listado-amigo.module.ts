import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoAmigoPageRoutingModule } from './listado-amigo-routing.module';

import { ListadoAmigoPage } from './listado-amigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoAmigoPageRoutingModule
  ],
  declarations: [ListadoAmigoPage]
})
export class ListadoAmigoPageModule {}
