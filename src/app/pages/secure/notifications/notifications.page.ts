import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  iconCart = '../../../../assets/icon/i-cart.svg';
  iconCartOrder = '../../../../assets/icon/i-cart-order.svg';
  iconSales = '../../../../assets/icon/i-sales.svg';
  cartItem: any;

  constructor(
    private cartServices: CartService,
  ) { }

  ngOnInit() {
    this.Cart();
  }

  async Cart(){
    let cartData = JSON.parse(await this.cartServices.getCart());
    this.cartItem = cartData.totalItem
    console.log('cartItem :', this.cartItem)
  }
}
