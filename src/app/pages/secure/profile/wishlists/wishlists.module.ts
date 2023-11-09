import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WishlistsPageRoutingModule } from './wishlists-routing.module';

import { WishlistsPage } from './wishlists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WishlistsPageRoutingModule
  ],
  declarations: [WishlistsPage]
})
export class WishlistsPageModule {}
