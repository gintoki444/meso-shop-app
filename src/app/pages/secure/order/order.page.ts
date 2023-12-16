import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

//import woo
import { ActivatedRoute, Router } from '@angular/router';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  iconLocation = '../../../../assets/icon/i-location.svg';
  iconStar = '../../../../assets/icon/i-star.svg';

  orderID: string;
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
    private router: Router,
    private WC: WoocommerceService,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getOrderData();
    // this.orderID = this.activatedRoute.snapshot.paramMap.get('orderID');
  }

  async getOrderData() {
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'ข้อมูลคำสั่งซื้อ',
      spinner: 'crescent'
    });
    await loading.present();

    let id = this.activatedRoute.snapshot.paramMap.get('orderID');
    let order = await this.WC.getOrderByID(id).toPromise();

    let statusName = this.orderStatus.filter(x => x.nameStatus == order.status);
    this.orderData = order;
    this.shipping = order.shipping;
    this.orderID = id;
    this.orderNameStatus = statusName[0];
    this.productData = order.line_items;

    loading.dismiss();
  }

}
