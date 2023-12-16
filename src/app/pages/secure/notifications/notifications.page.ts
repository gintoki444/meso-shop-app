import { Component, OnInit  } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ChangeDetectorRef } from '@angular/core';

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
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.Cart();
  }

  async Cart(){
    let cartData = JSON.parse(await this.cartServices.getCart());
    if(cartData) {
      this.cartItem = cartData.totalItem;
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }
}
