import { Injectable } from '@angular/core';
import { WoocommerceService } from '../woocommerces/woocommerce.service';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

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
    private rout: Router,
  ) { }

  // Function refresh data when back to this page
  ionViewWillEnter() {
    this.updateCustomer();
  }

  // get data customer of storage
  async getCustomer() {
    return (await this.storage.getStorage('userdata')).value;
  }


  async updateProfile(id: any, profile: any): Promise<any> {

    const data = await this.WC.putCustomerProfile(id, profile).toPromise();
    await this.updateCustomer();
    return data;
  }

  async addShipping(id: any, shippingData: any): Promise<any> {
    const data = await this.WC.putCustomer(id, shippingData).toPromise();
    await this.updateCustomer();
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

  // Update customer data to Storage
  async changePassword(id: any, passwordData: any) {
    const changed = await this.WC.changePassword(id, passwordData).toPromise();
    return changed;
  }

  async signOut() {
    this.storage.clearStorage();
    this.rout.navigateByUrl('/welcome');
  }
}
