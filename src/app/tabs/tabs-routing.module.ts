import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/secure/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'charts',
        loadChildren: () => import('../pages/secure/charts/charts.module').then(m => m.ChartsPageModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('../pages/secure/payments/payments.module').then(m => m.PaymentsPageModule)
      },
      {
        path: 'styleguide',
        loadChildren: () => import('../pages/secure/styleguide/styleguide.module').then(m => m.StyleguidePageModule)
      },
      {
        path: 'shop',
        loadChildren: () => import('../pages/secure/shop/shop.module').then(m => m.ShopPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../pages/secure/notifications/notifications.module').then(m => m.NotificationsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../pages/secure/settings/settings.module').then((m) => m.SettingsPageModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/secure/profile/profile.module').then(m => m.ProfilePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
