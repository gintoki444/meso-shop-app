import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutPage } from './checkout.page';
import { CouponResolveService } from 'src/app/services/resolver/coupon-resolve.service';
import { AddressResolveService } from 'src/app/services/resolver/address-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: CheckoutPage
  },
  {
    path: 'thank-you',
    loadChildren: () => import('./thank-you/thank-you.module').then(m => m.ThankYouPageModule)
  },
  {
    path: 'coupon/:add',
    loadChildren: () => import('../profile/coupon/coupon.module').then(m => m.CouponPageModule),
    resolve: {
      myarray: CouponResolveService.prototype.selectResolve,
    }
  },
  {
    path: 'address',
    loadChildren: () => import('../profile/address/address.module').then(m => m.AddressPageModule),
    resolve: {
      myarray :AddressResolveService.prototype.selectResolve,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutPageRoutingModule { }
