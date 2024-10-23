import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoNoticiaPageRoutingModule } from './listado-noticia-routing.module';

import { ListadoNoticiaPage } from './listado-noticia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoNoticiaPageRoutingModule
  ],
  declarations: [ListadoNoticiaPage]
})
export class ListadoNoticiaPageModule {}
