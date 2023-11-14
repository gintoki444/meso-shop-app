import { Component, OnInit } from '@angular/core';
//import woo
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.page.html',
  styleUrls: ['./wishlists.page.scss'],
})
export class WishlistsPage implements OnInit {

  // รับค่า
  allProducts: any = [];
  products: any = [];

  wishLists = [
    {
      id: 76,
    },
    {
      id: 73,
    },
    {
      id: 54,
    },
  ];

  iconWithList = '../../../../assets/icon/i-with-list-active.svg';
  iconCart = '../../../../assets/icon/i-cart.svg';

  cartItem: any;

  constructor(
    private WC: WoocommerceService,
    private cartServices: CartService,
  ) { }

  ngOnInit() {

    this.Cart();
    this.wishlistProducts();
  }

  async Cart(){
    let cartData = JSON.parse(await this.cartServices.getCart());
    this.cartItem = cartData.totalItem
    console.log('cartItem :', this.cartItem)
  }

  wishlistProducts() {
    this.WC.getAllProducts().subscribe((data: any) => {
      this.products = data;
      // console.log('All Products: ', this.allProducts);
    });
  }
}
