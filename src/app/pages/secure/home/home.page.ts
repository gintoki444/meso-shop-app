import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';
import { CartService } from 'src/app/services/cart/cart.service';

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
    ) {
      
    this.Cart();
    }
  

  ngOnInit() {

    this.homePageProducts();
    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  homePageProducts() {
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
