import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ChangeDetectorRef } from '@angular/core';
import { WishlistsService } from 'src/app/services/wishlists/wishlists.service';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.page.html',
  styleUrls: ['./wishlists.page.scss'],
})
export class WishlistsPage implements OnInit {

  // รับค่า
  allProducts: any = [];
  products: any = [];

  iconWithList = '../../../../assets/icon/i-with-list-active.svg';
  iconCart = '../../../../assets/icon/i-cart.svg';

  cartItem: any;

  constructor(
    private cartServices: CartService,
    private cdr: ChangeDetectorRef,
    private wishlistService: WishlistsService,
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.Cart();
    this.wishlistProducts();
  }

  async Cart() {
    let getCartData = await this.cartServices.getCart();
    if (getCartData) {
      let cartData = JSON.parse(getCartData);
      this.cartItem = cartData.totalItem;
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }

  wishlistProducts() {
    this.wishlistService.getWishlist().then((wishlist: any) => {
      this.products = wishlist
    });
  }
}
