import { Injectable } from '@angular/core';
import { WoocommerceService } from '../woocommerces/woocommerce.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customer: any;
  Shipping: any;
  editShipping: any;

  constructor(
    private WC: WoocommerceService,
    private storage: StorageService,
  ) { }

  // Function refresh data when back to this page
  ionViewWillEnter() {
    this.updateCustomer();
  }

  // get data customer of storage
  async getCustomer() {
    // await this.updateCustomer();
    return (await this.storage.getStorage('userdata')).value;
  }

  async updateProfile(id: any, profile: any): Promise<any> {

    const data = await this.WC.putCustomerProfile(id, profile).toPromise();
    await this.updateCustomer();
    // console.log('addShipping :', data);
    return data;
  }

  async addShipping(id: any, shippingData: any): Promise<any> {
    const data = await this.WC.putCustomer(id, shippingData).toPromise();
    await this.updateCustomer();
    // console.log('addShipping :', data);
    return data;
  }

  // add data shipping provice, distrisct to storage
  setShippingData(data: any) {
    this.Shipping = data;
    return this.Shipping;
  }

  // Get data shipping data provice, distrisct of storage
  getShippingData() {
    return this.Shipping;
  }
  
  // clear storage
  clearShippingData() {
    this.Shipping = '';
    return this.Shipping;
  }

  // Update customer data to Storage
  async updateCustomer() {
    const user = JSON.parse((await this.storage.getStorage('userdata')).value)
    const userData = JSON.stringify(await this.WC.getUserDataByID(user.id).toPromise());
    return await this.storage.setStorage('userdata', userData);
  }
}
