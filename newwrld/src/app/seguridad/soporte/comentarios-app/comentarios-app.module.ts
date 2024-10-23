import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentariosAppPageRoutingModule } from './comentarios-app-routing.module';

import { ComentariosAppPage } from './comentarios-app.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentariosAppPageRoutingModule,
    TranslateModule
  ],
  declarations: [ComentariosAppPage]
})
export class ComentariosAppPageModule {}
