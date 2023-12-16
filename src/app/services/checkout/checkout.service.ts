import { Injectable } from '@angular/core';
import { WoocommerceService } from '../woocommerces/woocommerce.service';
import { OmiseService } from '../omise/omise.service';
import { StorageService } from '../storage/storage.service';

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
    private storage: StorageService,
  ) { }


  async checkoutOrders(order: any): Promise<any> {
    this.orderData = await this.WC.postOrders(order).toPromise();
    await this.createOmiseCharges(this.orderData);
    await this.setCheckoutOrderData(this.orderData)
    return this.orderData
  }

  setShippingData(data: any) {
    this.orderShipping = data;
    this.storage.setStorage('shipping', JSON.stringify(this.orderShipping));
  }

  async getShippingData() {
    let data = await this.storage.getStorage('shipping');
    if (data?.value) {
      this.orderShipping = await JSON.parse(data.value);
    }
    return this.orderShipping;
  }

  setCouponData(data: any) {
    this.couponData = data;
  }

  getCouponData() {
    return this.couponData;
  }

  setCheckoutOrderData(data: any) {
    this.checkoutOrderData = data;
  }
  getCheckoutOrderData() {
    return this.checkoutOrderData;
  }

  async createOmiseCharges(data: any) {
    const orderData = {
      "amount": data.total * 100,
      "currency": "THB",
      "platform_type": "",
      "type": data.payment_method,
      "return_uri": document.location.origin + "/order/" + data.id,
      "description": "WooCommerce Order id " + data.id,
      "metadata": {
        "order_id": `${data.id}`
      },
      "source": {
        "type": data.payment_method,
        "phone_number": data.billing.phone
      }
    }

    await this.OPN.createCharges(orderData).subscribe((opnsData: any) => {
      window.open(opnsData.source.authorize_uri, '_blank');
    },
      (error) => {
        console.error('Error creating charge:', error);
      }
    );
  }
}