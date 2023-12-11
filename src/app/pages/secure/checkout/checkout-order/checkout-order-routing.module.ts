import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutOrderPage } from './checkout-order.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutOrderPageRoutingModule {}
