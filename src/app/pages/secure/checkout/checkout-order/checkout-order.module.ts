import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutOrderPageRoutingModule } from './checkout-order-routing.module';

import { CheckoutOrderPage } from './checkout-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutOrderPageRoutingModule
  ],
  declarations: [CheckoutOrderPage]
})
export class CheckoutOrderPageModule {}
