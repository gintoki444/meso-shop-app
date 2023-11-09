import { Component, OnInit } from '@angular/core';


//import woo
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  iconSearch = '../../../../assets/icon/i-search.svg';
  iconCart = '../../../../assets/icon/i-cart.svg';

  // รับค่า
  product: any;
  productImg: any;
  allProducts: any = [];

  constructor(
    private WC: WoocommerceService,
  ) {}

  ngOnInit() {
    this.searchProducts();
  }

  searchProducts() {
    // add cart service
    // this.cartService.cartItem.subscribe((data) => {
    //   this.cartItems = data;
    // });

    this.WC.getAllProducts().subscribe((data: any) => {
      this.allProducts = data;
      console.log('All Products: ', this.allProducts);
    });
  }

}