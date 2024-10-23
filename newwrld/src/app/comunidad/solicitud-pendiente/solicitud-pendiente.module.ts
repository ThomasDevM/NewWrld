import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudPendientePageRoutingModule } from './solicitud-pendiente-routing.module';

import { SolicitudPendientePage } from './solicitud-pendiente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudPendientePageRoutingModule
  ],
  declarations: [SolicitudPendientePage]
})
export class SolicitudPendientePageModule {}
