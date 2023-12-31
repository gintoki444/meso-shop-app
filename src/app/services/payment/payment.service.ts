import { Injectable } from '@angular/core';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';
import { OmiseService } from '../omise/omise.service';
import { CustomerService } from '../customer/customerservice';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private WC: WoocommerceService,
    private OPN: OmiseService,
    private customerService: CustomerService,
  ) { }

  payment: any;
  cardToken: any;
  paymentMobileBank: any = [
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

  async createCardToken(data: any) {

    const cardData = {
      expiration_month: data.expiryMonth,
      expiration_year: data.expiryYear,
      name: data.name,
      number: data.number,
      security_code: data.security_code,
    }

    const tokenData = await this.OPN.getCardToken(cardData).toPromise();
    
    return tokenData
  }

  setCardToken(data: any) {
    this.cardToken = data;
    return this.payment;
  }

  getCardToken(data: any) {
    this.cardToken = data;
    return this.payment;
  }

  // async getOmiseSource() {
  //   const testData = {
  //     "amount": 1604000,
  //     "currency": "THB",
  //     "platform_type": "IOS",
  //     "type": "mobile_banking_kbank"
  //   }
  //   await this.OPN.createSourcetest(testData).subscribe((opnsData: any) => {
  //     console.log('Charge created:', opnsData.id);

  //     let dataCharge = this.getOmiseCharge(opnsData.id);
  //     // console.log('data getOmiseCharge ', dataCharge);
  //     return dataCharge;
  //   },
  //     (error) => {
  //       console.error('Error creating charge:', error);
  //     }
  //   );


  // }

  // async getOmiseCharge(dataCharge: any) {
  //   const testData = {
  //     "amount": 1604000,
  //     "currency": "THB",
  //     "platform_type": "IOS",
  //     "type": "mobile_banking_kbank",
  //     "return_uri": "http://localhost:8100/order/1433",
  //     "source": dataCharge,
  //     "description": "WooCommerce Order id 1433",
  //     "metadata": {
  //       "order_id": "1433"
  //     }
  //   }
  //   console.log('Charge testData:', testData);

  //   await this.OPN.createChargestest(testData).subscribe((opnsData: any) => {
  //     console.log('Charge created:', opnsData);
  //   },
  //     (error) => {
  //       console.error('Error creating charge:', error);
  //     }
  //   );
  //   // console.log('data getOmiseCharge ', testData);

  //   // await this.OPN.createCharges(testData).subscribe((opnsData: any) => {
  //   //   console.log('Charge created:', opnsData);
  //   // },
  //   //   (error) => {
  //   //     console.error('Error creating charge:', error);
  //   //   }
  //   // );
  // }

}
