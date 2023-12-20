import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsPage } from './payments.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsPage
  },
  {
    path: 'credit-card',
    loadChildren: () => import('./credit-card/credit-card/credit-card.module').then( m => m.CreditCardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsPageRoutingModule {}
