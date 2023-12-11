import { Injectable } from '@angular/core';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';
import { OmiseService } from '../omise/omise.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private WC: WoocommerceService,
    private OPN: OmiseService,
  ) { }

  payment: any;
  paymentMobileBank: [
    {
      type: 'mobile_banking_kbank',
      title: 'K PLUS',
      logo: 'kplus'
    },
    {
      type: 'mobile_banking_scb',
      title: 'SCB EASY',
      logo: 'scb'
    },
    {
      type: 'mobile_banking_bay',
      title: 'KMA',
      logo: 'bay'
    },
    {
      type: 'mobile_banking_bbl',
      title: 'Bualuang mBanking',
      logo: 'bbl'
    },
    {
      type: 'mobile_banking_ktb',
      title: 'Krungthai NEXT',
      logo: 'ktb'
    },
  ]

  // get data payment_gateway of storage
  async getPaymentList() {
    const data = await this.WC.getPaymentGateway().toPromise()
    // await this.updateCustomer();
    return data;
  }

  // add data payment storage
  setPaymentData(data: any) {
    this.payment = data;
    return this.payment;
  }

  // Get data payment storage
  getPaymentData() {
    return this.payment;
  }

  async getOmiseSource(){
    const testData = {
      "amount": 1604000,
      "currency": "THB",
      "platform_type": "IOS",
      "type":"mobile_banking_kbank"
    }
    let data = await this.OPN.createSource(testData).toPromise();
    console.log( 'data getOmiseSource ',data);

    let dataCharge = await this.getOmiseCharge(data)
    console.log( 'data getOmiseCharge ',dataCharge);
    // return data;
  }
  
  async getOmiseCharge(dataCharge:any){
    const testData = {
      "amount": 1604000,
      "currency": "THB",
      "platform_type": "IOS",
      "type": "mobile_banking_kbank",
      "return_uri": "http://localhost:8100/order/1433",
      "source": dataCharge.id,
      "description": "WooCommerce Order id 1433",
      "metadata": {
          "order_id": "1433"
      }
  }
    let data = await this.OPN.createCharges(testData).toPromise();
    console.log( 'data OPN',data);
    // return data;
  }
  
}
