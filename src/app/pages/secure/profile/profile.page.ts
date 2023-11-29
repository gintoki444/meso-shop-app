import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customerservice';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private rout: Router,
    private activeRoute: ActivatedRoute,
    private customerService: CustomerService,
  ) { }

  displayName: any;
  imgProfile: any;
  emailCustomer: any;
  phoneCustomer: any;
  customer: any;


  ngOnInit() {

    this.activeRoute.params.subscribe(params => {
      this.getCustomer();
    });
  }

  async getCustomer() {

    this.customerService.updateCustomer();
    this.customer = JSON.parse(await this.customerService.getCustomer());
    this.imgProfile = this.customer.avatar_url;
    this.emailCustomer = this.customer.email;
    this.phoneCustomer = this.customer.billing.phone;

    if (this.customer.first_name && this.customer.last_name) {
      this.displayName = this.customer.first_name + ' ' + this.customer.last_name;
    } else {
      this.displayName = this.customer.username;
    }

    this.phoneCustomer == '' ? this.phoneCustomer : '-';
    console.log('customer :', this.customer)
  }

}
