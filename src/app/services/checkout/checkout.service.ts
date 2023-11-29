import { Injectable } from '@angular/core';
import { WoocommerceService } from '../woocommerces/woocommerce.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  orderData: any;
  orderShipping: any;
  couponData: any;

  constructor(
    private WC: WoocommerceService,
  ) { }


  async checkoutOrders(order: any): Promise<any> {
    this.orderData = await this.WC.postOrders(order).toPromise();
    console.log('checkout order ', this.orderData)
    return this.orderData
  }


  setShippingData(data: any) {
    console.log('Set Shipping', data)
    this.orderShipping = data;
  }

  getShippingData() {
    return this.orderShipping;
  }

  setCouponData(data: any) {
    console.log('Set couponData', data)
    this.couponData = data;
  }

  getCouponData() {
    return this.couponData;
  }
}
