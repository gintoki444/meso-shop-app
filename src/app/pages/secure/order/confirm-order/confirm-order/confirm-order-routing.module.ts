import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmOrderPage } from './confirm-order.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmOrderPage
  },
  {
    path: 'payments',
    children:
      [
        {
          path: ':orderId',
          loadChildren: () => import('../../../payments/payments.module').then(m => m.PaymentsPageModule),
        },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmOrderPageRoutingModule {}
