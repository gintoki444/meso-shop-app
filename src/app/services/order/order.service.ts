import { Injectable } from '@angular/core';
import { WoocommerceService } from '../woocommerces/woocommerce.service';
import { OmiseService } from '../omise/omise.service';
import { StorageService } from '../storage/storage.service';
// InAppBrowser
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderData:any;
  shippingData:any;

  orderStatus = [
    {
      id: 0,
      title: 'รอการชำระเงิน',
      nameStatus: 'pending',
    },
    {
      id: 1,
      title: 'กำลังดำเนินการจัดส่ง',
      nameStatus: 'processing',
    },
    {
      id: 2,
      title: 'สำเร็จแล้ว',
      nameStatus: 'completed',
    },
    {
      id: 3,
      title: 'ให้คะแนน',
      nameStatus: 'reviews',
    },
    {
      id: 4,
      title: 'ยกเลิกคำสั่งซือ',
      nameStatus: 'cancelled',
    },
    {
      id: 5,
      title: 'รอแจ้งชำระเงิน',
      nameStatus: 'on-hold',
    },
    {
      id: 6,
      title: 'ไม่สำเร็จ',
      nameStatus: 'failed',
    },
    {
      id: 6,
      title: 'คืนเงิน',
      nameStatus: 'refunded',
    }
  ]

  constructor(
    private WC: WoocommerceService,
    private OPN: OmiseService,
    private storage: StorageService,
    private iab : InAppBrowser,
  ) { }


  async getOpnStatus(id: any) {
    const opnData = await this.OPN.getCharges(id).toPromise();
    return opnData
  }

  async updateOrder(id: any, data: any) {
    const updataOrder = await this.WC.putOrders(id, data).toPromise();
    return updataOrder;
  }

  setOrderData(data:any){
    this.orderData = data;
    this.storage.setStorage('confirm-order',JSON.stringify(data))
    return this.orderData;
  }

  async getOrderData(){
    return  (await this.storage.getStorage('confirm-order')).value;
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
    console.log(data)
    console.log(orderData)

    if (data.payment_method === "omise_mobilebanking") {
      orderData.source = {
        type: data.payment_id,
        phone_number: data.billing.phone
      }
    }else if(data.payment_method === "omise") {
      orderData.card = data.token
    }

    await this.OPN.createCharges(orderData).subscribe((opnsData: any) => {

      let updateOrder = {
        transaction_id: opnsData.source.id
      }
      let metaID = opnsData.source.metadata.order_id

      this.WC.putOrders(metaID, updateOrder).subscribe((updateorder:any) => {
        if (updateorder) {
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

  setshippingData(data:any){
    this.shippingData = data;
    return this.orderData;
  }

  async getshippingData(){
    return this.orderData;
  }

  openInAppBrowser(url:any) {
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
