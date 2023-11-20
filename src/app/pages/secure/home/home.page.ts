import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';
import { CartService } from 'src/app/services/cart/cart.service';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  iconLightning = '../../../../assets/icon/i-lightning.svg';
  iconSearch = '../../../../assets/icon/i-search.svg';
  iconCart = '../../../../assets/icon/i-cart.svg';

  cartItem: any;
  swiperModules = [IonicSlides];
  content_loaded: boolean = false;
  allProducts: any = [];
  constructor(
    private WC: WoocommerceService,
    private cartServices: CartService,
    private cdr: ChangeDetectorRef,
  ) { }


  ngOnInit() {
    this.getCart();
    this.homePageProducts();
    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  homePageProducts() {
    this.WC.getAllProducts().subscribe((data: any) => {
      this.allProducts = data;
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
