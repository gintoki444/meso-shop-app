import { Injectable } from '@angular/core';
import { WoocommerceService } from '../woocommerces/woocommerce.service';
import { OmiseService } from '../omise/omise.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  orderData: any;
  orderShipping: any;
  couponData: any;

  constructor(
    private WC: WoocommerceService,
    private OPN: OmiseService,
  ) { }


  async checkoutOrders(order: any): Promise<any> {
    // this.orderData = order;
    // this.orderData.transaction_id = "";
    this.orderData = await this.WC.postOrders(order).toPromise();
    await console.log('checkout order ', this.orderData);
    await this.createOmiseSource(this.orderData);
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

  async createOmiseSource(data: any) {
    const orderData = {
      "amount": data.total*100,
      "currency": "THB",
      "platform_type": "",
      "type": data.payment_method,
    }
    console.log('createOmiseSource:', orderData);

    await this.OPN.createSource(orderData).subscribe((opnsData: any) => {
      console.log('Source created:', opnsData);
      this.createOmiseCharges(data,opnsData.id);
    },
      (error) => {
        console.error('Error creating charge:', error);
      }
    );
  }

  createOmiseCharges(data: any, source: any): void {
    const orderData = {
      "amount": data.total*100,
      "currency": "THB",
      "platform_type": "",
      "type": data.payment_method,
      "return_uri": "http://localhost:8100/order/" + data.id,
      "source": source,
      "description": "WooCommerce Order id " + data.id,
      "metadata": {
        "order_id": `${data.id}`
      }
    }
    console.log('createOmiseCharges:', orderData);

    this.OPN.createCharges(orderData).subscribe((opnsData: any) => {
      console.log('Charge created:', opnsData);
    },
      (error) => {
        console.error('Error creating charge:', error);
      }
    );
  }
}
