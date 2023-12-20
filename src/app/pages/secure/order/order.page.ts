import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

//import woo
import { ActivatedRoute, Router } from '@angular/router';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';
import { OrderService } from 'src/app/services/order/order.service';

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
  statusOrder: any;
  private interval: any;
  private iteration: number = 0;

  constructor(
    private router: Router,
    private WC: WoocommerceService,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.getOrderData();
  }

  ngAfterViewInit() {
    // this.getOrderData();
  }

  ngOnDestroy() {
    this.stopReloadStatusOrder();
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

    this.statusOrder = {
      status: order.status
    }

    if (this.statusOrder.status === 'pending' || this.statusOrder.status === 'on-hold') {
      this.startReloadStatusOrder();
    }

    let statusName = this.orderService.orderStatus.filter(x => x.nameStatus == this.statusOrder.status);
    this.orderData = order;
    this.shipping = order.shipping;
    this.orderID = id;
    this.orderNameStatus = statusName[0];
    this.productData = order.line_items;

    loading.dismiss();
  }

  async confirmOrder() {
    await this.orderService.setOrderData(this.orderData);
    console.log(this.orderData)
    this.router.navigate(['/', 'confirm-order']);
  }

  async cancleOrder() {
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'ยกเลิกคำสั่งซื้อ',
      spinner: 'crescent'
    });

    await loading.present();
    this.statusOrder = {
      status: "cancelled"
    }

    await this.orderService.updateOrder(this.orderID, this.statusOrder).then((data) => {

      loading.dismiss();
      this.router.navigate(['/my-orders/pending'])
      console.log(data)
    });
  }

  startReloadStatusOrder() {
    this.interval = setInterval(() => {

      this.iteration++;

      this.reloadStatusOrder();

      this.adjustInterval();
    }, 1000); // Initial interval (1 second)

    // setTimeout(() => this.stopReloadStatusOrder(), 10000);
  }

  stopReloadStatusOrder() {
    clearInterval(this.interval);
  }

  async reloadStatusOrder() {

    let paymentData = await this.orderService.getOpnStatus(this.orderData.transaction_id);

    if (paymentData.status !== "pending") {

      if (paymentData.status === 'successful') {

        const loading = await this.loadingController.create({
          cssClass: 'default-loading',
          message: 'สั่งซื้อสินค้าสำเร็จ',
          spinner: 'crescent'
        });
        await loading.present();

        this.statusOrder = {
          status: "processing"
        }
        let statusName = this.orderService.orderStatus.filter(x => x.nameStatus == this.statusOrder.status);
        this.orderNameStatus = statusName[0];

        this.orderData.status = this.statusOrder.status

        await this.orderService.updateOrder(this.orderID, this.statusOrder).then((data) => {
          this.stopReloadStatusOrder();
          loading.dismiss();
        });
      } else {
        this.stopReloadStatusOrder();
      }

    }

    return paymentData.status
  }

  adjustInterval() {
    switch (this.iteration) {
      case 3:
        clearInterval(this.interval);
        this.interval = setInterval(() => this.reloadStatusOrder(), 5000);
        break;
      case 5:
        clearInterval(this.interval);
        this.interval = setInterval(() => this.reloadStatusOrder(), 10000);
        break;
      case 10:
        clearInterval(this.interval);
        this.interval = setInterval(() => this.reloadStatusOrder(), 30000);
        break;

      default:
        this.iteration = 0;
        clearInterval(this.interval);
        this.interval = setInterval(() => this.reloadStatusOrder(), 3000); // 3 seconds
        break;
    }
  }



}
