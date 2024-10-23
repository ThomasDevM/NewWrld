import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionPageRoutingModule } from './configuracion-routing.module';

import { ConfiguracionPage } from './configuracion.page';

import { TranslateModule } from '@ngx-translate/core'; // Asegúrate de importar TranslateModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionPageRoutingModule,
    TranslateModule // Asegúrate de incluir TranslateModule
  ],
  declarations: [ConfiguracionPage]
})
export class ConfiguracionPageModule {}
