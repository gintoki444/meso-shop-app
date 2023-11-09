import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressPage } from './address.page';
import { AddressResolveService } from 'src/app/services/resolver/address-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: AddressPage
  },
  {
    path: 'add-address',
    loadChildren: () => import('./add-address/add-address.module').then( m => m.AddAddressPageModule),
    resolve: {
      myarray :AddressResolveService,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressPageRoutingModule {}
