import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomerService } from 'src/app/services/customer/customerservice';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {

  dataResolve: any;
  address_form:any = FormGroup;
  submit_attempt: boolean = false;

  shipping: any = {
    address_1: '',
    districts: '',
    amphures: '',
    provinces: '',
    postcode: '',
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private route: Router,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    // Setup form
    this.address_form =  this.formBuilder.group({
      address_1: ['', Validators.compose([Validators.maxLength(200), Validators.required])],
      districts: ['', Validators.compose([Validators.required])],
      amphures: ['', Validators.compose([Validators.required])],
      provinces: ['', Validators.compose([Validators.required])],
      postcode: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(5), Validators.maxLength(5)]],
    });


    // demo add data
    // this.address_form.get('address_1').setValue('119/291');
    // this.address_form.get('districts').setValue('บางกร่าง');
    // this.address_form.get('amphures').setValue('เมือง');
    // this.address_form.get('provinces').setValue('นนทบุรี');
    // this.address_form.get('postcode').setValue('11000');

    this.dataResolve = this.activeRoute.snapshot.data.myarray;
  }


  // Function refresh data when back to this page
  ionViewWillEnter() {
    this.getAddress();
  }

  async getAddress() {
    this.activeRoute.snapshot.paramMap.get('id');

    if (this.dataResolve.statusCheck == 'update') {
      const addressData = await this.customerService.getShippingData();
      console.log('customer id :', this.dataResolve.statusCheck);

      this.shipping = addressData;

      this.address_form.value.address_1 = addressData.address_1;
      this.address_form.value.districts = addressData.districts;
      this.address_form.value.amphures = addressData.amphures;
      this.address_form.value.provinces = addressData.provinces;
      this.address_form.value.postcode = addressData.postcode;

      this.address_form.get('address_1').setValue(addressData.address_1);
      this.address_form.get('districts').setValue(addressData.districts);
      this.address_form.get('amphures').setValue(addressData.amphures);
      this.address_form.get('provinces').setValue(addressData.provinces);
      this.address_form.get('postcode').setValue(addressData.postcode);
    }
    else{
      const addressData = await this.customerService.getShippingData();
      
      this.address_form.get('address_1').setValue(addressData.address_1);
      this.address_form.get('districts').setValue(addressData.districts);
      this.address_form.get('amphures').setValue(addressData.amphures);
      this.address_form.get('provinces').setValue(addressData.provinces);
      this.address_form.get('postcode').setValue(addressData.postcode);
    }
  }

  setAddress() {
    if (this.address_form?.valid) {
      this.shipping.address_1 = this.address_form.value.address_1,
        this.shipping.districts = this.address_form.value.districts,
        this.shipping.amphures = this.address_form.value.amphures,
        this.shipping.provinces = this.address_form.value.provinces,
        this.shipping.postcode = this.address_form.value.postcode,

        this.customerService.setShippingData(this.shipping);

      if (this.dataResolve.statusCheck == 'add') {
        this.route.navigateByUrl('/address/add-address');
      } else {
        this.route.navigateByUrl('/address/edit-address');
      }
      console.log('shipping :', this.shipping);
    }
  }
}
