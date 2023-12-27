import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

//import woo
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

// InAppBrowser
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.page.html',
  styleUrls: ['./confirm-order.page.scss'],
})
export class ConfirmOrderPage implements OnInit {

  iconLocation = '../../../../assets/icon/i-location.svg';
  iconStar = '../../../../assets/icon/i-star.svg';

  orderID: any;
  orderNameStatus: any;
  paymentData: any;
  orderData: any;
  shipping: any
  productData: any;
  statusOrder: any;
  originalData: any;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private checkoutServices: CheckoutService,
    private activeRoute: ActivatedRoute,
    private iab: InAppBrowser,
  ) { }

  ngOnInit() {
    this.loadData();
    this.getOrderData();
  }


  ionViewWillEnter() {
    this.getShipping();
    this.getPayment();
  }

  async loadData() {
    const getOriginalData = await this.orderService.getOrderData();
    if (getOriginalData) {
      this.originalData = JSON.parse(getOriginalData);
    }
  }

  async getOrderData() {
    const getOrderData = await this.orderService.getOrderData();

    if (getOrderData) {
      this.orderData = JSON.parse(getOrderData);

      let statusName = this.orderService.orderStatus.filter(x => x.nameStatus == this.orderData.status);
      this.shipping = this.orderData.shipping;
      this.orderID = this.orderData.id;
      this.orderNameStatus = statusName[0];
      this.productData = this.orderData.line_items;
      // loading.dismiss();
    } else {
      // loading.dismiss();
      this.router.navigate(['/my-orders/pending'])
    }
  }

  async getShipping() {
    let shipping = await this.checkoutServices.getUpdateShippingData();

    if (shipping) {
      let newShipping = {
        "first_name": `${shipping.first_name}`,
        "last_name": `${shipping.last_name}`,
        "address_1": `${shipping.address_1}`,
        "address_2": `${shipping.address_2}`,
        "city": `${shipping.provinces}`,
        "state": `${shipping.districts + ' ' + shipping.amphures}`,
        "postcode": `${shipping.postcode}`,
        "country": `${shipping.country}`,
        "phone": `${shipping.phone}`,
      }

      this.orderData.billing = newShipping;
      this.orderData.shipping = newShipping;

      this.shipping = newShipping;
    }
  }


  async getPayment() {
    this.paymentData = await this.paymentService.getPaymentData();

    if (this.paymentData) {

      if (this.paymentData.id === "omise_mobilebanking") {

        this.paymentData.subPayment.forEach((data: any) => {
          if (data.checked === true) {
            this.orderData.payment_id = data.type;
            this.orderData.payment_method_title = data.type;
          }
        })
      } else if (this.paymentData.id === "omise_promptpay") {

        this.orderData.payment_id = "promptpay";
        this.orderData.payment_method_title = "Promptpay";
      } else if (this.paymentData.id === "omise") {

        this.orderData.token = this.paymentData.token;
      }


      this.orderData.payment_method = this.paymentData.id;
      this.orderData.payment_method_title = this.paymentData.title;
    }
  }

  checkForUpdate(updateData: any): boolean {
    const hasUpdate = JSON.stringify(updateData).length !== JSON.stringify(this.originalData).length;
    return hasUpdate;
  }


  async payOrder() {
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'ข้อมูลคำสั่งซื้อ รอการชำระเงิน...',
      spinner: 'crescent'
    });
    await loading.present();

    const hasUpdates = this.checkForUpdate(this.orderData);
    const opnStatus = await this.orderService.getOpnStatus(this.orderData.transaction_id)

    if (hasUpdates == true) {

      let updateOrder = {
        billing: this.orderData.billing,
        shipping: this.orderData.shipping,
        payment_method: this.orderData.payment_method,
        payment_method_title: this.orderData.payment_method_title,

      }

      await this.orderService.updateOrder(this.orderID, updateOrder).then((data) => {

        if (this.orderData.payment_method === "omise_mobilebanking") {
          data.payment_id = this.orderData.payment_id

        } else if (this.orderData.payment_method === "omise") {
          data.token = this.orderData.token;
        }

        this.orderService.createOmiseCharges(data).then(() => {
          this.router.navigate(['order/' + this.orderID]);
        });
      })
    } else {
      this.orderData.payment_id = opnStatus.source.type;

      this.orderService.createOmiseCharges(this.orderData).then(() => {
        this.router.navigate(['order/' + this.orderID]);
      });
    }
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
