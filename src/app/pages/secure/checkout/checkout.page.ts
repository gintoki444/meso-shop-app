import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

// Form and Validation
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ChangeDetectorRef } from '@angular/core';

// Service
import { CartService } from 'src/app/services/cart/cart.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { CustomerService } from 'src/app/services/customer/customerservice';
import { CouponService } from 'src/app/services/coupon/coupon.service';
import { PaymentService } from 'src/app/services/payment/payment.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  iconSearch = '../../../../assets/icon/i-search.svg';
  iconLocation = '../../../../assets/icon/i-location.svg';
  iconCart = '../../../../assets/icon/i-cart.svg';

  orderData: FormGroup;

  constructor(
    private cartService: CartService,
    private router: Router,
    private checkoutServices: CheckoutService,
    private customerService: CustomerService,
    private formbuilder: FormBuilder,
    private couponService: CouponService,
    private paymentService: PaymentService,
    private loadingController: LoadingController,
    // private cdr: ChangeDetectorRef,
  ) {
  }

  products: any[] = [];
  shippingData: any;
  paymentData: any;
  totalPrice: any;
  summaryPrice: any = 0;

  couponData: any;
  couponCode: any = [];
  discount: any = 0;

  ngOnInit() {
    // this.getCheckoutData();
    this.orderData = this.formbuilder.group({
      customer_id: ['', [Validators.required]],
      payment_method: ['', [Validators.required]],
      payment_method_title: ['', [Validators.required]],
      payment_id: '',
      set_paid: false,
      total: null,
      status: "pending",
      billing: ['', [Validators.required]],
      shipping: ['', [Validators.required]],
      line_items: ['', [Validators.required]],
      coupon_lines: [],
      shipping_lines: []
    })
  }

  // Function refresh data when back to this page
  ionViewWillEnter() {
    this.getCheckoutData();
    this.getShipping();
    this.getCoupon();
    this.calculatePrice();
    this.getPayment();
  }

  async getCheckoutData() {
    const receivedData = await this.cartService.getSetCartData();
    const customerData = JSON.parse(await this.customerService.getCustomer());

    if (receivedData) {

      this.products = receivedData.products;
      const lineProduct = []

      this.products.forEach(data => {
        lineProduct.push({
          product_id: data.product.id,
          quantity: data.product.quantity,
        })

      })

      this.totalPrice = receivedData.products.totalPrice;
      this.orderData.value.total = this.totalPrice;
      this.orderData.value.customer_id = customerData.id;
      this.orderData.value.line_items = lineProduct;


      this.orderData.get('customer_id').setValue(customerData.id);
      this.orderData.get('line_items').setValue(lineProduct);
      this.calculatePrice();

    } else {
      this.router.navigate(['/home'])
    }
  }

  async getShipping() {
    // this.cdr.detectChanges();
    let shipping = await this.checkoutServices.getShippingData();
    // let defaultShipping = JSON.parse(await this.cartServices.getCart());

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

      this.orderData.get('billing').setValue(newShipping);
      this.orderData.get('shipping').setValue(newShipping);

      this.orderData.value.billing = newShipping;
      this.orderData.value.shipping = newShipping;
      this.shippingData = newShipping;
    }
  }

  async getCoupon() {
    this.couponData = await this.couponService.getCouponData();
    if (this.couponData) {
      let couponCode = {
        "code": `${this.couponData.code}`,
      }

      this.orderData.value.coupon = couponCode;
      this.couponCode = couponCode;
    }
  }

  async getPayment() {
    this.paymentData = await this.paymentService.getPaymentData();

    if (this.paymentData) {

      if (this.paymentData.subPayment) {
        this.paymentData.subPayment.forEach(data => {
          if (data.checked === true) {
            this.orderData.get('payment_id').setValue(data.type);
            this.orderData.value.payment_method_title = data.type;
          }
        })
      } else if (this.paymentData.id === "omise_promptpay") {
        this.orderData.get('payment_id').setValue("promptpay");
        this.orderData.value.payment_method_title = "promptpay";
      } else {

      }
      this.orderData.get('payment_method').setValue(this.paymentData.id);
      this.orderData.get('payment_method_title').setValue(this.paymentData.title);
      this.orderData.value.payment_method = this.paymentData.id;
      this.orderData.value.payment_method_title = this.paymentData.title;

    }
  }


  calculatePrice() {
    if (!this.couponData) {
      this.summaryPrice = this.totalPrice - this.discount;
    } else {
      if (this.couponData.discount_type == 'percent') {
        this.discount = this.totalPrice * this.couponData.amount / 100;
        this.summaryPrice = this.totalPrice - this.discount;
      } else {
        this.discount = Number(this.couponData.amount);
        this.summaryPrice = this.totalPrice - this.discount;
      }
    }
  }

  async checkoutOrders() {
    let clearProduct: any = [];
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'บันทึกข้อมูลคำสั่งซื้อ',
      spinner: 'crescent'
    });
    await loading.present();

    await this.checkoutServices.checkoutOrders(this.orderData.value).then(data => {
      if (this.products.length > 1) {
        clearProduct = this.products;
      } else {
        this.products.forEach(data => {
          clearProduct = data.product;
        })
      }
      this.cartService.removeProduct(clearProduct);
      loading.dismiss();
      this.router.navigate(['checkout', 'thank-you', data.id])
    }).catch(e => {
      console.log(e)
    })
  }



}
