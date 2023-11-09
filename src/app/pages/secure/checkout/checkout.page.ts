import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  iconSearch = '../../../../assets/icon/i-search.svg';
  iconLocation = '../../../../assets/icon/i-location.svg';
  iconCart = '../../../../assets/icon/i-cart.svg';

  constructor() { }

  ngOnInit() {
  }

}
