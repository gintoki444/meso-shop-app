import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
// import { FilterPage } from './filter/filter.page';
import { Router, ActivatedRoute } from '@angular/router';

import { PaymentService } from 'src/app/services/payment/payment.service';



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
  kmaIconBank = '../../../../assets/icon/kma-bank.svg';
  kplusIconBank = '../../../../assets/icon/kplus-bank.svg';
  ktbIconBank = '../../../../assets/icon/ktb-bank.svg';
  bblIconBank = '../../../../assets/icon/bbl-bank.svg';
  scbIconBank = '../../../../assets/icon/scb-bank.svg';

  subPayment: any = [
    {
      type: 'mobile_banking_kbank',
      title: 'K PLUS',
      logo: this.kplusIconBank,
      detail: 'รอยืนยัน 3 นาที ชำระเงิน',
      checked: false,
    },
    {
      type: 'mobile_banking_scb',
      title: 'SCB EASY',
      logo: this.scbIconBank,
      detail: 'รอยืนยัน 3 นาที ชำระเงิน',
      checked: false,
    },
    {
      type: 'mobile_banking_bay',
      title: 'KMA',
      logo: this.kmaIconBank,
      detail: 'รอยืนยัน 3 นาที ชำระเงิน',
      checked: false,
    },
    {
      type: 'mobile_banking_bbl',
      title: 'Bualuang mBanking',
      logo:  this.bblIconBank,
      detail: 'รอยืนยัน 3 นาที ชำระเงิน',
      checked: false,
    },
    {
      type: 'mobile_banking_ktb',
      title: 'Krungthai NEXT',
      logo: this.ktbIconBank,
      detail: 'รอยืนยัน 3 นาที ชำระเงิน',
      checked: false,
    },
  ]


  constructor(
    private activatedRoute: ActivatedRoute,
    private rount: Router,
    private paymentService: PaymentService,
    private animationCtrl: AnimationController,
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
      }
      //  else if (data.id === "omise") {
      //   data.subPayment = [{
      //     type: 'omise',
      //     checked: false,
      //   }]

      // }
    })
    this.paymentData = payment;
    console.log(this.paymentData)
  }

  togglePayment(payment: any): void {
    if (payment.subPayment && payment.subPayment.length > 0) {
      payment.checked = !payment.checked;
    } else {
      this.selectPayment(payment);
    }
  }

  selectPayment(payment: any) {
    if (payment.id === 'omise') {
      this.AddCreditCard(payment);
    } else {

      this.paymentData.forEach((item: any) => {
        if (item.id !== payment.id) {
          item.selectData = false;
        } else {
          item.selectData = true;
        }
      })
      this.selectData = payment;
    }
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

  AddCreditCard(payment: any) {

    this.paymentService.setPaymentData(payment);

    let id = this.activatedRoute.snapshot.paramMap.get('orderID');
    if (!id) {
      this.rount.navigate(['checkout', 'payments', 'credit-card'])
    } else {
      this.rount.navigate(['confirm-order', 'payment', 'credit-card', id])
    }
  }

  addPayment() {
    this.paymentService.setPaymentData(this.selectData);

    let id = this.activatedRoute.snapshot.paramMap.get('orderID');
    if (!id) {
      this.rount.navigate(['/checkout'])
    } else {
      console.log(this.selectData)
      this.rount.navigate(['/confirm-order'])
    }
  }
}
