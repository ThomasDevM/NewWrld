import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListaDeseoPageRoutingModule } from './lista-deseo-routing.module';
import { ListaDeseoPage } from './lista-deseo.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDeseoPageRoutingModule,
    TranslateModule
  ],
  declarations: [ListaDeseoPage]
})
export class ListaDeseoPageModule {}
