import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';

//import woo
import { ActivatedRoute, Router } from '@angular/router';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';

import { CartService } from 'src/app/services/cart/cart.service';
import { CustomerService } from 'src/app/services/customer/customerservice';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements AfterViewInit {
  iconCart = '../../../../assets/icon/i-cart.svg';
  iconCartOrder = '../../../../assets/icon/i-cart-order.svg';
  iconCartSuccess = '../../../../assets/icon/i-cart-success.svg';
  iconCartPending = '../../../../assets/icon/i-cart-pending.svg';
  iconCartProcessing = '../../../../assets/icon/i-cart-processing.svg';

  cartItem: any;
  activeID: any;
  activeIndex: number = 0;
  lineStyles: { [key: string]: string } = {};


  dataOrder: any;

  orderStatus = [
    {
      id: 0,
      title: 'ที่ต้องชำระ',
      nameStatus: 'pending',
      icon: this.iconCartPending,
    },
    {
      id: 1,
      title: 'ที่ต้องได้รับ',
      nameStatus: 'processing',
      icon: this.iconCartProcessing,
    },
    {
      id: 2,
      title: 'สำเร็จ',
      nameStatus: 'completed',
      icon: this.iconCartSuccess,
    },
    {
      id: 3,
      title: 'ให้คะแนน',
      nameStatus: 'reviews',
      icon: '',
    }
  ]

  orderList: any
  // = [
  //   {
  //     id: 123477,
  //     status: 'completed',
  //   },
  //   {
  //     id: 456844,
  //     status: 'completed',
  //   },
  //   {
  //     id: 112233,
  //     status: 'processing',
  //   },
  //   {
  //     id: 123456,
  //     status: 'processing',
  //   },
  //   {
  //     id: 456812,
  //     status: 'pending',
  //   }
  // ]
  customer: any;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private WC: WoocommerceService,
    private cartServices: CartService,
    private customerService: CustomerService,
    private loadingController: LoadingController,
  ) { }


  @ViewChild('line') lineElement: ElementRef;
  @ViewChild('items') itemsElement: ElementRef;


  ngAfterViewInit() {
    this.getOrderData();
    // this.getOrdersList();
    this.Cart();
  }


  async Cart() {
    let cartData = JSON.parse(await this.cartServices.getCart());
    this.cartItem = cartData.totalItem
    console.log('cartItem :', this.cartItem)
  }

  // Set line position
  setActiveItem(index: number) {
    if (index !== this.activeIndex) {
      if (index === 3) {
        this.router.navigate(['/', 'reviews']);
      } else {
        this.activeID = this.orderStatus.filter(x => x.id == index);

        this.activeIndex = index;
        this.dataOrder = this.orderList.filter(x => x.status == this.activeID[0].nameStatus);
        console.log('test', this.dataOrder)
      }
    }
  }

  async getOrderData() {
    
    let status = this.activatedRoute.snapshot.paramMap.get('status');
    this.activeID = this.orderStatus.filter(x => x.nameStatus == status);
    this.activeIndex = this.activeID[0].id;

    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'ข้อมูลคำสั่งซื้อ',
      spinner: 'crescent'
    });
    await loading.present();
    
    this.customer = JSON.parse(await this.customerService.getCustomer());
    this.orderList = await this.WC.getOrderByCustomerID(this.customer.id).toPromise();

    this.dataOrder = this.orderList.filter(x => x.status == status);
    
    loading.dismiss();
  }

}
