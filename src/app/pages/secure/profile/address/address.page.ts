import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from 'src/app/services/customer/customerservice';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  iconLocation = '../../../../assets/icon/i-location-2.svg';
  dataResolve: any;
  resetShippingData: any = {
    shipping_id: '',
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    districts: '',
    amphures: '',
    provinces: '',
    postcode: '',
    country: 'TH',
    phone: "",
    status: "No",
    detail: '',
  };
  shippingData: any;
  selectShippingData: any;
  billingData: any;

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.dataResolve = this.activeRoute.snapshot.data.myarray;
    this.activeRoute.params.subscribe(params => {
      this.getShipping();
    });
  }

  // IonViewWillEnter() {
  //   this.getShipping();
  // }

  async getShipping() {
    this.customerService.updateCustomer();
    const shippingDataNew = JSON.parse(await this.customerService.getCustomer());
    this.billingData = shippingDataNew.billing

    shippingDataNew.meta_data.forEach(data => {
      if (data.key == 'shipping') {
        this.shippingData = data.value;
      }
    })
  }

  selectShipping(shipping: any) {
    if(this.dataResolve.statusCheck === 'select'){
      this.selectShippingData = shipping;
      this.addOrderShipping();
    }
  }

  async addOrderShipping() {
    this.checkoutService.setShippingData(this.selectShippingData);
    
    let id = this.activeRoute.snapshot.paramMap.get('orderID');
    if(!id){
      this.route.navigate(['checkout'])
    }else{
      this.route.navigate(['/confirm-order'])
    }
  }

  async AddNewShipping(){
    await this.customerService.clearShippingData();
    this.route.navigate(['/','address','add-address']);
  }

  async editShipping(shipping: any){
    await this.customerService.setShippingData(shipping);
    this.route.navigate(['/','address','edit-address'])
  }
}
