import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
// import { FilterPage } from './filter/filter.page';
import { Router } from '@angular/router';

import { PaymentService } from 'src/app/services/payment/payment.service';

interface PaymentList {
  id: string;
  subPayment?: string[]; // Sublist of items
  checked: boolean;
}


@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})

export class PaymentsPage implements OnInit {

  content_loaded: boolean = false;
  paymentList: any;
  paymentData: any;
  selectData: any;

  subPayment: any = [
    {
      type: 'mobile_banking_kbank',
      title: 'K PLUS',
      logo: 'kplus',
      detail: 'รอยืนยัน 3 นาที ชำระเงิน',
      checked: false,
    },
    {
      type: 'mobile_banking_scb',
      title: 'SCB EASY',
      logo: 'scb',
      detail: 'รอยืนยัน 3 นาที ชำระเงิน',
      checked: false,
    },
    {
      type: 'mobile_banking_bay',
      title: 'KMA',
      logo: 'bay',
      detail: 'รอยืนยัน 3 นาที ชำระเงิน',
      checked: false,
    },
    {
      type: 'mobile_banking_bbl',
      title: 'Bualuang mBanking',
      logo: 'bbl',
      detail: 'รอยืนยัน 3 นาที ชำระเงิน',
      checked: false,
    },
    {
      type: 'mobile_banking_ktb',
      title: 'Krungthai NEXT',
      logo: 'ktb',
      detail: 'รอยืนยัน 3 นาที ชำระเงิน',
      checked: false,
    },
  ]


  testData: any = [
    {
      id: "bacs",
      title: 'โอน/ชำระผ่านบัญชีธนาคาร',
      description: 'หลังจากชำระเงินเสร็จแล้ว กรุณาส่งสลิปและเลขที่ใบสั่งซื้อมาที่ หน้าแจ้งชำระเงิน (Confirm payment) หรือแจ้งกลับมาที่ Line@ : mesoestetic ได้เลยนะคะ Customer Service ( Tel: 097-043-3305,  Email: cus-meso@mesoestetic-th.com )',
      checked: false,
      subPayment: [],

    },
    {
      id: "omise",
      title: "Credit / Debit Card",
      description: '',
      checked: false,
      subPayment: [],
    },
    {
      id: "omise_installment",
      title: "Installments",
      description: '',
      checked: false,
      subPayment: [],

    },
    {
      id: "omise_internetbanking",
      title: "Internet Banking",
      description: '',
      checked: false,
      subPayment: [],

    },
    {
      id: "omise_mobilebanking",
      title: "Mobile Banking",
      description: '',
      checked: false,
      subPayment: [
        {
          type: 'mobile_banking_kbank',
          title: 'K PLUS',
          logo: 'kplus',
          detail: 'รอยืนยัน 3 นาที ชำระเงิน',
          checked: false,
        },
        {
          type: 'mobile_banking_scb',
          title: 'SCB EASY',
          logo: 'scb',
          detail: 'รอยืนยัน 3 นาที ชำระเงิน',
          checked: false,
        },
        {
          type: 'mobile_banking_bay',
          title: 'KMA',
          logo: 'bay',
          detail: 'รอยืนยัน 3 นาที ชำระเงิน',
          checked: false,
        },
        {
          type: 'mobile_banking_bbl',
          title: 'Bualuang mBanking',
          logo: 'bbl',
          detail: 'รอยืนยัน 3 นาที ชำระเงิน',
          checked: false,
        },
        {
          type: 'mobile_banking_ktb',
          title: 'Krungthai NEXT',
          logo: 'ktb',
          detail: 'รอยืนยัน 3 นาที ชำระเงิน',
          checked: false,
        },
      ],

    },
  ]
  expandedSubPayment: PaymentList | null = null;


  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private rount: Router,
    private paymentService: PaymentService,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    this.getPaymentGateWay();
    this.paymentService.getOmiseSource();
    console.log('testData:', this.testData);
    // this.paymentService.createOmise();

    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  async getPaymentGateWay() {

    this.paymentList = await this.paymentService.getPaymentList();

    let payment = this.paymentList.filter((gateway: any) => gateway.enabled == true);

    payment.forEach((data:any) => {
      if(data.id === "omise_mobilebanking"){
        data.sub_payment = this.subPayment;
      }
    })

    console.log('Enabled payment:', payment);
    // this.paymentData 
    // console.log('Enabled Payment Gateways:', this.paymentData);
  }

  togglePayment(payment: PaymentList) {
    if (payment.subPayment.length > 0) {
      this.expandedSubPayment = this.expandedSubPayment === payment ? null : payment;
      let toggleCheck = this.expandedSubPayment ? true : false;
      console.log('select toggleCheck', toggleCheck)

      this.selectPayment(payment);
      const rotationAnimation = this.createRotationAnimation(toggleCheck);
      rotationAnimation.play();

    } else {
      payment.checked = true;
      this.expandedSubPayment = null;
      this.createRotationAnimation(true);
      this.selectPayment(payment);
    }
  }

  selectPayment(payment: any) {
    console.log('select', payment)
    this.testData.forEach((item: any) => {
      if (item.id !== payment.id) {
        item.checked = false;
      }
    })
    this.selectData = payment;
  }

  selectSubPayment(payment: any, subPayment: any) {
    subPayment.checked = true;
    payment.checked = true;
    payment.subPayment.forEach((item: any) => {
      if (item.type !== subPayment.type) {
        item.checked = false;
      }
    })
    this.selectPayment(payment);
  }

  createRotationAnimation(isExpanded: boolean): Animation {
    const rotateValueIn = isExpanded == true ? '0deg' : '180deg';
    const rotateValueOut = isExpanded == true ? '180deg' : '0deg';
    return this.animationCtrl.create()
      .addElement(document.querySelector('.rotate-icon'))
      .duration(400)
      .easing('ease-in-out')
      .fromTo('transform', `rotate(${rotateValueIn})`, `rotate(${rotateValueOut})`);
  }

  addPayment(){
    this.paymentService.setPaymentData(this.selectData);
    this.rount.navigate(['/checkout'])
  }

  // Filter
  // async filter() {

  //   // Open filter modal
  //   const modal = await this.modalController.create({
  //     component: FilterPage,
  //     // swipeToClose: true,
  //     presentingElement: this.routerOutlet.nativeEl
  //   });

  //   await modal.present();

  //   // Apply filter from modal
  //   let { data } = await modal.onWillDismiss();

  //   if (data) {

  //     // Reload
  //     this.content_loaded = false;

  //     // Fake timeout
  //     setTimeout(() => {
  //       this.content_loaded = true;
  //     }, 2000);
  //   }
  // }

}
