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
    children: [
      {
        path: '',
        loadChildren: () => import('./add-address/add-address.module').then(m => m.AddAddressPageModule),
        resolve: {
          myarray: AddressResolveService.prototype.addResolve,
        }
      },
      // {
      //   path: 'add-address/city',
      //   loadChildren: () => import('./add-address/city/city.module').then(m => m.CityPageModule),
      //   resolve: {
      //     myarray: AddressResolveService.prototype.editResolve,
      //   }
      // }
    ]
  },
  {
    path: 'edit-address',
    loadChildren: () => import('./add-address/add-address.module').then(m => m.AddAddressPageModule),
    resolve: {
      myarray: AddressResolveService.prototype.editResolve,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressPageRoutingModule { }
