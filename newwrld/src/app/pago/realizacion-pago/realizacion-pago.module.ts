import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RealizacionPagoPageRoutingModule } from './realizacion-pago-routing.module';

import { RealizacionPagoPage } from './realizacion-pago.page';

import { TranslateModule } from '@ngx-translate/core';
import { loadStripe } from '@stripe/stripe-js';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RealizacionPagoPageRoutingModule,
    TranslateModule,
  ],
  declarations: [RealizacionPagoPage]
})
export class RealizacionPagoPageModule {}
