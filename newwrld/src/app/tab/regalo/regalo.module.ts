import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegaloPageRoutingModule } from './regalo-routing.module';

import { RegaloPage } from './regalo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegaloPageRoutingModule
  ],
  declarations: [RegaloPage]
})
export class RegaloPageModule {}
