import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';

//import woo
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
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

  orderPending: any;
  orderProcessing: any;

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

  orderList: any;
  customer: any;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private WC: WoocommerceService,
    private cartServices: CartService,
    private customerService: CustomerService,
    private loadingController: LoadingController,
    private cdr: ChangeDetectorRef,
  ) { }

  @ViewChild('line') lineElement!: ElementRef;
  @ViewChild('items') itemsElement!: ElementRef;

  ngOnInit() {
    this.activatedRoute.params.subscribe(() => {
      this.getOrderData();
    });
  }


  ngAfterViewInit() {
    this.Cart();
  }

  async Cart() {
    let getCartData = await this.cartServices.getCart();
    if (getCartData) {
      let cartData = JSON.parse(getCartData);
      this.cartItem = cartData.totalItem;
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }

  // Set line position
  setActiveItem(index: number) {
    if (index !== this.activeIndex) {
      if (index === 3) {
        this.router.navigate(['/', 'reviews']);
      } else {
        this.activeID = this.orderStatus.filter((x:any) => x.id == index);

        this.activeIndex = index;
        this.dataOrder = this.orderList.filter((x:any) => x.status == this.activeID[0].nameStatus);
      }
    }
  }

  async getOrderData() {

    let status = this.activatedRoute.snapshot.paramMap.get('status');
    this.activeID = this.orderStatus.filter((x: any) => x.nameStatus == status);
    this.activeIndex = this.activeID[0].id;

    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'ข้อมูลคำสั่งซื้อ',
      spinner: 'crescent'
    });
    await loading.present();

    const getCustomer = await this.customerService.getCustomer();
    if(getCustomer){
      this.customer = JSON.parse(getCustomer);
      this.orderList = await this.WC.getOrderByCustomerID(this.customer.id).toPromise();
  
      this.dataOrder = this.orderList.filter((x: any) => x.status == status);
      this.orderPending = this.countOrderByStatus(this.orderList, "pending");
      this.orderProcessing = this.countOrderByStatus(this.orderList, "processing");
    }

    loading.dismiss();
  }

  countOrderByStatus(orders: any, status: any) {
    const filteredOrders = orders.filter((order: any) => order.status === status);
    return filteredOrders.length;
  }

}
