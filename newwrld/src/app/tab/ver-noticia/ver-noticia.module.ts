import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VerNoticiaPageRoutingModule } from './ver-noticia-routing.module';
import { VerNoticiaPage } from './ver-noticia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerNoticiaPageRoutingModule
  ],
  declarations: [VerNoticiaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Agrega esto
})
export class VerNoticiaPageModule {}
