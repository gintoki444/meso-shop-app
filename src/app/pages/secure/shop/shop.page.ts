import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';
import { CartService } from 'src/app/services/cart/cart.service';

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
  )  {
  }
  allProducts: any = [];
  cartItem: any;

  ngOnInit() {

    this.Cart();
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

  async Cart(){
    let cartData = JSON.parse(await this.cartServices.getCart());
    this.cartItem = cartData.totalItem
    console.log('cartItem :', this.cartItem)
  }
}
