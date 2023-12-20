import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

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
  t: any;

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
    private checkoutService: CheckoutService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
   this.t = this.getOrderData();
    // this.orderID = this.activatedRoute.snapshot.paramMap.get('orderID');
  }

  //Clear interval เมื่อออกจาก page
  ionViewWillLeave() {
    clearInterval(this.t);
  }

  async getOrderData() {
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'ข้อมูลคำสั่งซื้อ รอการชำระเงิน',
      spinner: 'crescent'
    });
    await loading.present();

    this.orderData = await this.checkoutService.getCheckoutOrderData();
    if (this.orderData) {
      let statusName = this.orderStatus.filter(x => x.nameStatus == this.orderData.status);

      this.orderID = this.orderData.id;
      this.shipping = this.orderData.shipping;
      this.orderNameStatus = statusName[0];
      this.productData = this.orderData.line_items;

    } else {
      loading.dismiss();
      this.rout.navigateByUrl('/home')
    }
  }
}
