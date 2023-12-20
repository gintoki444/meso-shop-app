import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmOrderPageRoutingModule } from './confirm-order-routing.module';

import { ConfirmOrderPage } from './confirm-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmOrderPageRoutingModule
  ],
  declarations: [ConfirmOrderPage]
})
export class ConfirmOrderPageModule {}
