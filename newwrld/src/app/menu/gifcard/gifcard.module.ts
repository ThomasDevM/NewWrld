import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GifcardPageRoutingModule } from './gifcard-routing.module';

import { GifcardPage } from './gifcard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GifcardPageRoutingModule
  ],
  declarations: [GifcardPage]
})
export class GifcardPageModule {}
