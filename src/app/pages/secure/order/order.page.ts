import { Component, OnInit } from '@angular/core';

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

  orderID: any;
  orderNameStatus: any;
  getData: any;


  

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
    },
    {
      orderID: 456879,
      statusOrder: 'cancelled',
    }
  ]

  constructor(
    private router: Router,
    private WC: WoocommerceService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.orderID = this.activatedRoute.snapshot.paramMap.get('orderID');

    this.getData = this.orderList.filter(x => x.orderID == Number(this.orderID));
    this.getData = this.getData[0]

    let statusName = this.orderStatus.filter(x => x.nameStatus == this.getData.statusOrder);
    this.orderNameStatus = statusName[0]


    console.log('getData :', this.getData)
    console.log('orderNameStatus :', this.orderNameStatus)

    // this.activatedRoute.paramMap.subscribe(params => {
    //   let statusOrder = params.get('orderID');
    //   this.getData = statusOrder;
    //   console.log('getData :', this.getData)
    // });

  }




}
