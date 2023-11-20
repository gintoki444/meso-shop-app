import { Injectable } from '@angular/core';
import { WoocommerceService } from '../woocommerces/woocommerce.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customer:any;

  constructor(
    private WC: WoocommerceService,
    private storage: StorageService,
  ) { }

  async getCustomer() {
    return (await this.storage.getStorage('userdata')).value;
  }

  async addShipping(id: any, userData:any) :Promise <any>{
    const data = await this.WC.putCustomer(id,userData).toPromise();
    return data;
  }
}
