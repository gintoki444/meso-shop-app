import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  iconLightning = '../../../../assets/icon/i-lightning.svg';
  iconSearch = '../../../../assets/icon/i-search.svg';
  iconCart = '../../../../assets/icon/i-cart.svg';

  swiperModules = [IonicSlides];

  contentLoaded: boolean = false;

  constructor(
    private WC: WoocommerceService,
    private cartServices: CartService,
    private cdr: ChangeDetectorRef,
  )  {
  }
  allProducts: any = [];
  cartItem: any;

  ngOnInit() {

    this.getCart();
    this.shopPageProducts();
  }

  shopPageProducts() {
    // add cart service
    // this.cartService.cartItem.subscribe((data) => {
    //   this.cartItems = data;
    // });

    this.WC.getAllProducts().subscribe((data: any) => {
      this.allProducts = data;
      console.log('All Products: ', this.allProducts);
    });
  }

  
  getCart() {
    this.cartServices.cart.subscribe((cart) => {
      if(cart) {
        this.cartItem = cart.totalItem;
        this.cdr.detectChanges(); // Manually trigger change detection
      }
    });
    this.cartServices.getCartData();
  }
}
