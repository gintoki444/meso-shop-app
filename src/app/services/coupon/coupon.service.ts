import { Injectable } from '@angular/core';
import { WoocommerceService } from '../woocommerces/woocommerce.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  coupon: any;

  constructor(
    private WC: WoocommerceService,
    private storage: StorageService,
  ) { }

  // get data customer of storage
  async getCouponList() {
    const data = await this.WC.getcouponList().toPromise()
    // await this.updateCustomer();
    console.log('data ',data);
    return data;
  }
  
  // add data shipping provice, distrisct to storage
  setCouponData(data: any) {
    this.coupon = data;
    return this.coupon;
  }

  // Get data shipping data provice, distrisct of storage
  getCouponData() {
    return this.coupon;
  }
}
