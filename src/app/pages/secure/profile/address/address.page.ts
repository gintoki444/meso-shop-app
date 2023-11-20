import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CheckoutService } from 'src/app/services/checkout/checkout.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  iconLocation = '../../../../assets/icon/i-location-2.svg';
  dataResolve: any;

  shippingData: any = {
    first_name: "ชานุ",
    last_name: "Admin IT",
    address_1: "52/23 AIA",
    address_2: "",
    city: "กรุงเทพ",
    state: "ดินแดง",
    postcode: "10100",
    country: "TH"
  }

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
  ) { }

  ngOnInit() {

    const data = this.activeRoute.snapshot.data.myarray;
    if (data) {
      this.dataResolve = data;
    } else {
      this.dataResolve = "";
      console.log("dataResolve: ", this.dataResolve)
    }
  }

  async addOrderShipping() {
    this.checkoutService.setShippingData(this.shippingData)
    this.route.navigate(['checkout'])
  }
}
