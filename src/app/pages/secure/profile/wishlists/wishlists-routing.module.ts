import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishlistsPage } from './wishlists.page';

const routes: Routes = [
  {
    path: '',
    component: WishlistsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistsPageRoutingModule {}
