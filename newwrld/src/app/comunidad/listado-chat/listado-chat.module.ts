import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoChatPageRoutingModule } from './listado-chat-routing.module';

import { ListadoChatPage } from './listado-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoChatPageRoutingModule
  ],
  declarations: [ListadoChatPage]
})
export class ListadoChatPageModule {}
