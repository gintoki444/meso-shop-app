import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';


//import woo
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';
import { ChangeDetectorRef } from '@angular/core';

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
  cartItem: any;

  constructor(
    private WC: WoocommerceService,
    private cartServices: CartService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.Cart();
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

  async Cart(){
    let cartData = JSON.parse(await this.cartServices.getCart());
    if(cartData) {
      this.cartItem = cartData.totalItem;
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }

}
