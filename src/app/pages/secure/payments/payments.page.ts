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


  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private rount: Router,
    private paymentService: PaymentService,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    this.getPaymentGateWay();

    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  async getPaymentGateWay() {

    this.paymentList = await this.paymentService.getPaymentList();

    let payment = this.paymentList.filter((gateway: any) => gateway.enabled == true);

    payment.forEach((data: any) => {
      data.checked = false;
      data.selectData = false;
      if (data.id === "omise_mobilebanking") {
        data.subPayment = this.subPayment;
      } else if (data.id === "omise") {
        data.subPayment = [{
          type: 'omise',
          checked: false,
        }]

      }
    })
    this.paymentData = payment;
  }

  togglePayment(payment: any): void {
    if (payment.subPayment && payment.subPayment.length > 0) {
      payment.checked = !payment.checked;
    } else {
      this.selectPayment(payment);
    }
  }

  selectPayment(payment: any) {
    this.paymentData.forEach((item: any) => {
      if (item.id !== payment.id) {
        item.selectData = false;
      }else{
        item.selectData = true;
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

  AddCreditCard() {
    this.rount.navigate(['checkout', 'payments', 'credit-card'])
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

  addPayment() {
    this.paymentService.setPaymentData(this.selectData);
    this.rount.navigate(['/checkout'])
  }
}
