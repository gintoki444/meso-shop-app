import { Injectable } from '@angular/core';
import { WoocommerceService } from '../woocommerces/woocommerce.service';
import { OmiseService } from '../omise/omise.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  orderData: any;
  checkoutOrderData: any;
  orderShipping: any;
  couponData: any;

  constructor(
    private WC: WoocommerceService,
    private OPN: OmiseService,
  ) { }


  async checkoutOrders(order: any): Promise<any> {
    this.orderData = await this.WC.postOrders(order).toPromise();
    await console.log('checkout order ', this.orderData);
    await this.createOmiseCharges(this.orderData);
    await this.setCheckoutOrderData(this.orderData)
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

  setCheckoutOrderData(data: any) {
    console.log('Set Checkout Order', data)
    this.checkoutOrderData = data;
  }
  getCheckoutOrderData() {
    return this.checkoutOrderData;
  }



  async createOmiseCharges(data: any) {
    const orderData = {
      "amount": data.total*100,
      "currency": "THB",
      "platform_type": "",
      "type": data.payment_method,
      "return_uri": "http://localhost:8100/order/" + data.id,
      "description": "WooCommerce Order id " + data.id,
      "metadata": {
        "order_id": `${data.id}`
      },
      "source": {
        "type": data.payment_method,
        "phone_number": data.billing.phone
      }
    }
    console.log('createOmiseCharges:', orderData);

    await this.OPN.createCharges(orderData).subscribe((opnsData: any) => {
      // console.log('Charge created:', opnsData);
      console.log('window:', opnsData.source.authorize_uri);
      window.open(opnsData.source.authorize_uri, '_blank');
    },
      (error) => {
        console.error('Error creating charge:', error);
      }
    );
  }
}
