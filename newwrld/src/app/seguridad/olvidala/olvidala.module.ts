import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvidalaPageRoutingModule } from './olvidala-routing.module';

import { OlvidalaPage } from './olvidala.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvidalaPageRoutingModule,
    TranslateModule
  ],
  declarations: [OlvidalaPage]
})
export class OlvidalaPageModule {}

