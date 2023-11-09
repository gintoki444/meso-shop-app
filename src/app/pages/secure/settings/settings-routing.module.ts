import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
  },
  {
    path: 'devices',
    loadChildren: () => import('./devices/devices.module').then(m => m.DevicesPageModule)
  },
  {
    path: 'backups',
    loadChildren: () => import('./backups/backups.module').then(m => m.BackupsPageModule)
  },
  {
    path: 'profile',
    children:
      [
        {
          path: '',
          loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
        },
      ]
    // loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule { }
