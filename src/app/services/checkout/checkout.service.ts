import { Injectable } from '@angular/core';
import { WoocommerceService } from '../woocommerces/woocommerce.service';
import { OmiseService } from '../omise/omise.service';
import { StorageService } from '../storage/storage.service';

// InAppBrowser
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

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
    private iab: InAppBrowser,
  ) { }


  async checkoutOrders(order: any): Promise<any> {
    this.orderData = await this.WC.postOrders(order).toPromise();

    this.orderData.payment_id = order.payment_id;
    this.orderData.token = order.token;

    this.createOmiseCharges(this.orderData);
    this.setCheckoutOrderData(this.orderData)

    return this.orderData;
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

  async getUpdateShippingData() {
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
      amount: data.total * 100,
      currency: "THB",
      platform_type: "",
      return_uri: document.location.origin + "/order/" + data.id,
      description: "WooCommerce Order id " + data.id,
      metadata: {
        order_id: `${data.id}`
      },
      source: {},
      card: "",
    }

    if (data.payment_method === "omise_mobilebanking") {
      orderData.source = {
        type: data.payment_id,
        phone_number: data.billing.phone
      }
    }else if(data.payment_method === "omise") {
      orderData.card = data.token
    }

    console.log(orderData)

    await this.OPN.createCharges(orderData).subscribe((opnsData: any) => {

      let updateOrder = {
        transaction_id: opnsData.source.id
      }
      let metaID = opnsData.source.metadata.order_id

      this.WC.putOrders(metaID, updateOrder).subscribe(updaterder => {
        if (updaterder) {
          setTimeout(() => {
            this.openInAppBrowser(opnsData.source.authorize_uri);
          }, 1000);
        }
      });
    },
      (error) => {
        console.error('Error creating charge:', error);
      }
    );
  }

  openInAppBrowser(url: any) {
    const browser = this.iab.create(
      url,
      '_self',
      {
        location: 'no',
        hidden: 'no',
        hardwareback: 'yes',
        toolbar: 'no',
        // toolbarposition: 'top',
        fullscreen: 'no'
      }
    );
  }
}
