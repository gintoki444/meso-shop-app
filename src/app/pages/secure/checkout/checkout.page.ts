import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Form and Validation
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ChangeDetectorRef } from '@angular/core';

// Service
import { CartService } from 'src/app/services/cart/cart.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { CustomerService } from 'src/app/services/customer/customerservice';


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
    // private cdr: ChangeDetectorRef,
  ) {
  }

  products: any[] = [];
  shippingData: any;
  paymentData: any;
  couponData: any;
  totalPrice:any;
  summaryPrice:any;


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
    this.orderData = this.formbuilder.group({
      customer_id: '',
      payment_method: ['', Validators.compose([Validators.required])],
      payment_method_title: ['', Validators.compose([Validators.required])],
      set_paid: true,
      status: "processing",
      billing: ['', Validators.compose([Validators.required])],
      shipping: ['', Validators.compose([Validators.required])],
      line_items: [],
      coupon_lines: [],
      shipping_lines: []
    })
  }

  // Function refresh data when back to this page
  ionViewWillEnter() {
    this.getCheckoutData();
    this.getShipping();
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
      this.orderData.value.customer_id = customerData.id;
      this.orderData.value.shipping = this.shippingData;
      this.orderData.value.line_items = lineProduct;

      this.calculatePrice();

      // console.log(' totalPrice :',  this.totalPrice)
      // console.log(' orderData :',  this.orderData)
    } else {
      this.router.navigate(['/home'])
    }
  }

  async getShipping() {
    // this.cdr.detectChanges();
    this.shippingData = await this.checkoutServices.getShippingData();
  }

  async checkoutOrders() {
    await this.checkoutServices.checkoutOrders(this.orderData).then(data => {
      console.log(data);
    }).catch(e => {
      console.log(e)
    })
  }

  calculatePrice(){
    if(this.couponData){
      console.log(' Have coupon :');

    }else{
      this.couponData = 0;
      this.summaryPrice = this.totalPrice - this.couponData;
    }
  }

}
