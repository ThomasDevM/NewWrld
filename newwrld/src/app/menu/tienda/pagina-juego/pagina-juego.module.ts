import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaJuegoPageRoutingModule } from './pagina-juego-routing.module';

import { PaginaJuegoPage } from './pagina-juego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaJuegoPageRoutingModule
  ],
  declarations: [PaginaJuegoPage]
})
export class PaginaJuegoPageModule {}
