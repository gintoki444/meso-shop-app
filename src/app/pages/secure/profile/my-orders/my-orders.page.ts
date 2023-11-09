import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';


//import woo
import { ActivatedRoute, Router } from '@angular/router';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';

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

  orderList = [
    {
      orderID: 123477,
      statusOrder: 'completed',
    },
    {
      orderID: 456844,
      statusOrder: 'completed',
    },
    {
      orderID: 112233,
      statusOrder: 'processing',
    },
    {
      orderID: 123456,
      statusOrder: 'processing',
    },
    {
      orderID: 456812,
      statusOrder: 'pending',
    }
  ]
  constructor(
    private router: Router,
    private WC: WoocommerceService,
    private activatedRoute: ActivatedRoute,
  ) { }


  @ViewChild('line') lineElement: ElementRef;
  @ViewChild('items') itemsElement: ElementRef;


  ngAfterViewInit() {

    this.getOrderData();
  }

  // Set line position
  setActiveItem(index: number) {
    if (index !== this.activeIndex) {
      if (index === 3) {
        this.router.navigate(['/', 'reviews']);
      } else {
        this.activeID = this.orderStatus.filter(x => x.id == index);

        this.activeIndex = index;
        this.dataOrder = this.orderList.filter(x => x.statusOrder == this.activeID[0].nameStatus);
      }
    }
  }

  getOrderData() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      // get id by param path
      let statusOrder = paramMap.get('status');
      this.activeID = this.orderStatus.filter(x => x.nameStatus == statusOrder);

      this.activeIndex = this.activeID[0].id;

      console.log('Get activeID :', this.activeID);
      this.dataOrder = this.orderList.filter(x => x.statusOrder == statusOrder);
    });
  }

}
