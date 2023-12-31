import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressResolveService } from 'src/app/services/resolver/address-resolve.service';
import { CouponResolveService } from 'src/app/services/resolver/coupon-resolve.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./../../tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'styleguide',
    loadChildren: () =>
      import('./styleguide/styleguide.module').then(
        (m) => m.StyleguidePageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
  },
  {
    path: 'settings/profile/edit',
    loadChildren: () =>
      import('./profile/edit/edit.module').then((m) => m.EditPageModule),
  },
  {
    path: 'payments/detail',
    loadChildren: () =>
      import('./payments/payment-detail/payment-detail.module').then(
        (m) => m.PaymentDetailPageModule
      ),
  },
  {
    path: 'product/detail/:productID',
    loadChildren: () =>
      import('./product-detail/product-detail.module').then(
        (m) => m.ProductDetailPageModule
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'categories',
    children: [
      {
        path: ':categoriesID',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesPageModule)
      },
    ]
  },
  {
    path: 'wishlists',
    loadChildren: () => import('./profile/wishlists/wishlists.module').then(m => m.WishlistsPageModule)
  },
  {
    path: '', children: [
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'cart/product/detail/:productID',
        loadChildren: () =>
          import('./product-detail/product-detail.module').then(
            (m) => m.ProductDetailPageModule
          ),
      },
    ]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutPageModule)
  },
  {
    path: 'coupon',
    loadChildren: () => import('./profile/coupon/coupon.module').then(m => m.CouponPageModule),
    resolve: {
      myarray: CouponResolveService.prototype.addResolve,
    }
  },
  {
    path: 'address',
    children: [
      {
        path: '',
        loadChildren: () => import('./profile/address/address.module').then(m => m.AddressPageModule),
        resolve: {
          myarray: AddressResolveService.prototype.resolve,
        }
      },
    ]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'my-orders',
    children:
      [
        {
          path: ':status',
          loadChildren: () => import('./profile/my-orders/my-orders.module').then(m => m.MyOrdersPageModule)
        }
      ]
  },
  {
    path: 'reviews',
    loadChildren: () => import('./profile/reviews/reviews.module').then(m => m.ReviewsPageModule)
  },
  {
    path: 'profile/edit',
    loadChildren: () => import('./profile/edit/edit.module').then(m => m.EditPageModule)
  },
  {
    path: 'profile/change-password',
    loadChildren: () => import('./profile/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
  },
  {
    path: 'order',
    children:
      [
        {
          path: ':orderID',
          loadChildren: () => import('./order/order.module').then(m => m.OrderPageModule)
        },
      ]
  },
  {
    path: 'thank-you',
    loadChildren: () => import('./checkout/thank-you/thank-you.module').then(m => m.ThankYouPageModule)
  },
  {
    path: 'confirm-order',
    children:
      [
        {
          path: '',
          loadChildren: () => import('./order/confirm-order/confirm-order/confirm-order.module').then(m => m.ConfirmOrderPageModule)
        },
        {
          path: 'payment/:orderID',
          loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsPageModule)
        },
        {
          path: 'address/:orderID',
          loadChildren: () => import('./profile/address/address.module').then(m => m.AddressPageModule),
          resolve: {
            myarray: AddressResolveService.prototype.selectResolve,
          }
        },
        {
          path: 'payment/credit-card/:orderID',
          loadChildren: () => import('./payments/credit-card/credit-card/credit-card.module').then(m => m.CreditCardPageModule)
        },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule { }
