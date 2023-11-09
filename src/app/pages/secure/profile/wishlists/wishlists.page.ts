import { Component, OnInit } from '@angular/core';
//import woo
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';

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

  constructor(
    private WC: WoocommerceService,
  ) { }

  ngOnInit() {

    this.wishlistProducts();
  }

  wishlistProducts() {
    this.WC.getAllProducts().subscribe((data: any) => {
      this.products = data;
      // console.log('All Products: ', this.allProducts);
    });
  }
}
