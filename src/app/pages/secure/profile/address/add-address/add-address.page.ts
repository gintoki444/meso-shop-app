import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { CustomerService } from 'src/app/services/customer/customerservice';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

  dataResolve: any
  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
  ) { }

  txtTitle: any = '';


  customerID: any;
  shipping_form: any = FormGroup;
  shippingData: any = {

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

  ngOnInit() {



    // Setup form
    this.shipping_form = this.formBuilder.group({
      first_name: ['', Validators.compose([Validators.maxLength(200), Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      shipping: ['', Validators.compose([Validators.required])],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
      detail: [''],
    });

    const getDataResolve: any = this.activeRoute.snapshot.data;
    this.dataResolve = getDataResolve.myarray;
  }

  // Function refresh data when back to this page
  ionViewWillEnter() {
    this.getShipping();
  }

  async getShipping() {
    const shippingAddress = await this.customerService.getShippingData();

    if (this.dataResolve.statusCheck === 'add') {

      if (shippingAddress) {
        this.shippingData.address_1 = shippingAddress.address_1;
        this.shippingData.districts = shippingAddress.districts;
        this.shippingData.amphures = shippingAddress.amphures;
        this.shippingData.provinces = shippingAddress.provinces;
        this.shippingData.postcode = shippingAddress.postcode;
        this.shippingData.detail = shippingAddress.detail;

        this.shipping_form.get('shipping').setValue(shippingAddress.address_1 + ' '
          + shippingAddress.districts + ' '
          + shippingAddress.amphures + ' '
          + shippingAddress.provinces + ' '
          + shippingAddress.postcode);
      }

    } else if (this.dataResolve.statusCheck === 'update') {

      const shippingAddress = await this.customerService.getShippingData();

      if (shippingAddress) {
        // console.log('shippingAddress.detail', shippingAddress.detial)

        this.shippingData.shipping_id = shippingAddress.shipping_id;
        this.shippingData.first_name = shippingAddress.first_name;
        this.shippingData.phone = shippingAddress.phone;
        this.shippingData.shipping_id = shippingAddress.shipping_id;
        this.shippingData.address_1 = shippingAddress.address_1;
        this.shippingData.districts = shippingAddress.districts;
        this.shippingData.amphures = shippingAddress.amphures;
        this.shippingData.provinces = shippingAddress.provinces;
        this.shippingData.postcode = shippingAddress.postcode;
        this.shippingData.detail = shippingAddress.detail;

        this.shipping_form.get('first_name').setValue(shippingAddress.first_name);
        this.shipping_form.get('last_name').setValue(shippingAddress.last_name);
        this.shipping_form.get('phone').setValue(shippingAddress.phone);
        this.shipping_form.get('detail').setValue(shippingAddress.detail);
        this.shipping_form.get('shipping').setValue(shippingAddress.address_1 + ' '
          + shippingAddress.districts + ' '
          + shippingAddress.amphures + ' '
          + shippingAddress.provinces + ' '
          + shippingAddress.postcode);

      } else {
        this.route.navigateByUrl('/address');
      }
    }
  }



  async addShipping() {
    // Proceed with loading overlay
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Recording....',
      spinner: 'crescent'
    });
    await loading.present();

    const getCustomer = await this.customerService.getCustomer();
    let customer: any = "";
    let DataShip: any = '';
    let allShipping = [];
    let metaData = {
      key: "shipping",
      value: {}
    }

    if (getCustomer) {
      customer = JSON.parse(getCustomer);
      DataShip = customer.meta_data.find((data: any) => data.key == 'shipping');
    }
    if (DataShip) {
      allShipping = DataShip.value;
    }

    if (this.shipping_form.valid) {

      this.customerID = customer.id;
      this.shippingData.shipping_id = allShipping.length + 1;
      this.shippingData.first_name = this.shipping_form.value.first_name;
      this.shippingData.last_name = this.shipping_form.value.last_name;
      this.shippingData.phone = this.shipping_form.value.phone;
      this.shippingData.detail = this.shipping_form.value.detail;

      allShipping.push(this.shippingData);
      metaData.value = allShipping;

      await this.customerService.addShipping(this.customerID, metaData).then(data => {
        loading.dismiss();
        this.navCtrl.pop();
      }).catch(e => {
        console.log(e)
      });
    }
  }

  async updateShipping() {
    // Proceed with loading overlay
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Recording....',
      spinner: 'crescent'
    });

    await loading.present();
    if (this.shipping_form.valid) {

      const getCustomer = await this.customerService.getCustomer();
      let customer: any = "";
      let DataShip: any = "";
      let allShipping = [];
      let metaData = {
        key: "shipping",
        value: {}
      }

      if (getCustomer) {
        customer = JSON.parse(getCustomer);
        DataShip = customer.meta_data.find((data: any) => data.key == 'shipping');
      }


      if (DataShip) {
        allShipping = DataShip.value;
      }

      this.customerID = customer.id;
      this.shippingData.first_name = this.shipping_form.value.first_name;
      this.shippingData.last_name = this.shipping_form.value.last_name;
      this.shippingData.phone = this.shipping_form.value.phone;
      this.shippingData.detail = this.shipping_form.value.detail;

      let updateShipping = await this.updateDataById(allShipping, this.shippingData.shipping_id, this.shippingData);

      metaData.value = await updateShipping;

      await this.customerService.addShipping(this.customerID, metaData).then(data => {

        loading.dismiss();
        this.navCtrl.pop();
      }).catch(e => {
        console.log(e)
      });
    }
  }

  async updateDataById(dataArray: any, idToUpdate: any, updatedData: any) {
    let newData = []

    newData = await dataArray.map((item: any) => {

      if (item.shipping_id === idToUpdate) {

        return { ...item, ...updatedData };
      }
      return item;
    });

    return newData;
  }

  async selectAddress() {
    if (this.dataResolve.statusCheck === 'update') {
      this.setShipping();
      await this.customerService.setShippingData(this.shippingData);
      this.route.navigate(['address', 'edit-address', 'city', this.shippingData.shipping_id])
    } else {
      this.route.navigate(['address', 'add-address', 'city'])
    }
  }

  setShipping() {
    this.shippingData.first_name = this.shipping_form.value.first_name;
    this.shippingData.last_name = this.shipping_form.value.last_name;
    this.shippingData.phone = this.shipping_form.value.phone;
    this.shippingData.detail = this.shipping_form.value.detail;
  }
}
