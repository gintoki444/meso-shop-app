import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  iconCart = '../../../../assets/icon/i-cart.svg';
  iconCartOrder = '../../../../assets/icon/i-cart-order.svg';
  iconSales = '../../../../assets/icon/i-sales.svg';
  constructor() { }

  ngOnInit() {
  }

}
