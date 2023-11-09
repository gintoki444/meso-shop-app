import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAddressPage } from './add-address.page';
import { AddressResolveService } from 'src/app/services/resolver/address-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: AddAddressPage
  },
  {
    path: 'city',
    loadChildren: () => import('./city/city.module').then( m => m.CityPageModule),
    resolve: {
      myarray :AddressResolveService,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAddressPageRoutingModule {}
