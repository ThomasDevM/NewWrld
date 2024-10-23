import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificacionesPageRoutingModule } from './notificaciones-routing.module';
import { NotificacionesPage } from './notificaciones.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionesPageRoutingModule,
    TranslateModule
  ],
  declarations: [NotificacionesPage]
})
export class NotificacionesPageModule { }
