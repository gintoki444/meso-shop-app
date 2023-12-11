import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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


  // orderData: any = {
  //   customer_id: null,
  //   payment_method: "bacs",
  //   payment_method_title: "Direct Bank Transfer",
  //   set_paid: true,
  //   status: "processing",
  //   billing: {
  //     "first_name": "",
  //     "last_name": "",
  //     "address_1": "969 Market",
  //     "address_2": "",
  //     "city": "San Francisco",
  //     "state": "CA",
  //     "postcode": "94103",
  //     "country": "US",
  //     "email": "john.doe@example.com",
  //     "phone": "(555) 555-5555"
  //   },
  //   shipping: {
  //     "first_name": "John",
  //     "last_name": "Doe",
  //     "address_1": "969 Market",
  //     "address_2": "",
  //     "city": "San Francisco",
  //     "state": "CA",
  //     "postcode": "94103",
  //     "country": "US"
  //   },
  //   line_items: [],
  //   coupon_lines: [],
  //   shipping_lines: [
  //     {
  //       "method_id": "flat_rate",
  //       "method_title": "Flat Rate",
  //       "total": "10.00"
  //     }
  //   ]
  // }

  ngOnInit() {
    this.getCheckoutData();
    this.orderData = this.formbuilder.group({
      customer_id: null,
      payment_method: ['', [Validators.required]],
      payment_method_title: ['', [Validators.required]],
      set_paid: true,
      total: null,
      status: "on-hold",
      billing: ['', [Validators.required]],
      shipping: ['', [Validators.required]],
      line_items: [],
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
      this.calculatePrice();

    } else {
      this.router.navigate(['/home'])
    }
  }

  async getShipping() {
    // this.cdr.detectChanges();
    let shipping = await this.checkoutServices.getShippingData();

    if (shipping) {
      let newShipping = {
        "first_name": `${shipping.first_name}`,
        "last_name": `${shipping.last_name}`,
        "address_1": `${shipping.address_1}`,
        "address_2": `${shipping.address_2}`,
        "city": `${shipping.provinces}`,
        "state": `${shipping.districts + ' ' + shipping.amphuresstate}`,
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
      console.log('couponCode ', this.couponData);

      this.orderData.value.coupon = couponCode;
      this.couponCode = couponCode;
    }
  }

  async getPayment() {
    this.paymentData = await this.paymentService.getPaymentData();

    if (this.paymentData) {

      if (this.paymentData.subPayment.length > 0) {
        console.log('Have subPayment')
        this.paymentData.subPayment.forEach(data => {
          if (data.checked === true) {
            console.log('payment_method: ',data.type)
            console.log('payment_method: ',data.title)
            this.orderData.get('payment_method').setValue(data.type);
            this.orderData.get('payment_method_title').setValue(data.title);
            this.orderData.value.payment_method = data.type;
            this.orderData.value.payment_method_title = data.title;
          }
        })
      } else {
        console.log('Not Have subPayment')
        this.orderData.get('payment_method').setValue(this.paymentData.id);
        this.orderData.get('payment_method_title').setValue(this.paymentData.title);
        this.orderData.value.payment_method = this.paymentData.id;
        this.orderData.value.payment_method_title = this.paymentData.title;
      }

    }
  }


  calculatePrice() {
    if (!this.couponData) {
      this.summaryPrice = this.totalPrice - this.discount;
    } else {
      if (this.couponData.discount_type == 'percent') {
        this.discount = this.totalPrice * this.couponData.amount / 100;
        console.log('discount ', this.discount);
        this.summaryPrice = this.totalPrice - this.discount;
      } else {
        this.discount = Number(this.couponData.amount);
        this.summaryPrice = this.totalPrice - this.discount;
      }
    }
  }

  async checkoutOrders() {
    await this.checkoutServices.checkoutOrders(this.orderData.value).then(data => {
      console.log(data);
      this.router.navigate(['checkout', 'thank-you', data.id])
    }).catch(e => {
      console.log(e)
    })
  }



}
