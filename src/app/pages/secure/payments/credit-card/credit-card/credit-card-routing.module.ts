import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditCardPage } from './credit-card.page';

const routes: Routes = [
  {
    path: '',
    component: CreditCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditCardPageRoutingModule {}
