import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.scss'],
})
export class ThankYouPage implements OnInit {
  iconLocation = '../../../../assets/icon/i-location.svg';

  orderID: any;
  orderNameStatus: any;
  orderData: any;
  shipping: any
  productData: any;

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
    private rout: Router,
    private activeRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
    private loadingController: LoadingController,
    private WC: WoocommerceService,
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.getOrderData();
    // this.orderID = this.activatedRoute.snapshot.paramMap.get('orderID');
  }

  async getOrderData() {
    // const loading = await this.loadingController.create({
    //   cssClass: 'default-loading',
    //   message: 'ข้อมูลคำสั่งซื้อ',
    //   spinner: 'crescent'
    // });
    // await loading.present();

    this.orderData = await this.checkoutService.getCheckoutOrderData();
    if (this.orderData) {
      let statusName = this.orderStatus.filter(x => x.nameStatus == this.orderData.status);

      this.orderID = this.orderData.id;
      this.shipping = this.orderData.shipping;
      this.orderNameStatus = statusName[0];
      this.productData = this.orderData.line_items;

      console.log('orderID ', this.orderID)
      console.log('orderData ', this.orderData)
      console.log('shipping ', this.shipping)
      console.log('orderNameStatus ', this.orderNameStatus)
      console.log('productData ', this.productData)
    } else {
      this.rout.navigateByUrl('/home')
    }


    // loading.dismiss();
  }

  // async getOrder() {
  //   let orderID = await this.activeRoute.paramMap.subscribe(data => {
  //     let id = data.get('orderID')
  //     return id
  //   })
  //   console.log('orderID :', orderID)
  // }

}
