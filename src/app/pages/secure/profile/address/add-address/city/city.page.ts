import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

import { CustomerService } from 'src/app/services/customer/customerservice';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {

  dataResolve: any;
  address_form: FormGroup;
  submit_attempt: boolean = false;

  shipping: any;

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private WC: WoocommerceService,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {


    // Setup form
    this.address_form = this.formBuilder.group({
      address_1: ['', Validators.compose([Validators.maxLength(200), Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      postcode: ['', Validators.compose([Validators.maxLength(5), Validators.required])]
    });

    const data = this.route.snapshot.data.myarray;
    if (data) {
      this.dataResolve = data;
    } else {
      this.dataResolve = "";
      console.log("dataResolve: ", this.dataResolve)
    }
  }

  async updateAddress() {
    const customer = JSON.parse(await this.customerService.getCustomer());
    // console.log(' Cus ID :',customer);
    if (this.address_form.valid) {
      this.shipping = {
        id: 1,
        first_name: '',
        last_name: '',
        address_1: this.address_form.value.address_1,
        address_2: '',
        city: this.address_form.value.city,
        state: this.address_form.value.state,
        postcode: this.address_form.value.postcode,
        country: 'TH'
      }

      // this.WC.putCustomer()
      console.log('customer id :', customer.id);
      console.log('shipping :', this.shipping);

      await this.customerService.addShipping(customer.id, this.shipping).then(data => {

        console.log('add :',data);
      }).catch(e => {
        console.log('e :', e);
      })
    }
  }

  addAddress() { }
}
