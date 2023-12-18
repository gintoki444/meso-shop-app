import { Injectable } from '@angular/core';
import { WoocommerceService } from '../woocommerces/woocommerce.service';
import { OmiseService } from '../omise/omise.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private WC: WoocommerceService,
    private OPN: OmiseService,
  ) { }


  async getOpnStatus(id: any) {
    const opnData = await this.OPN.getCharges(id).toPromise();
    return opnData
  }

  async updateOrder(id: any, data: any) {
    const updataOrder = await this.WC.putOrders(id, data).toPromise();
    return updataOrder;
  }

}
