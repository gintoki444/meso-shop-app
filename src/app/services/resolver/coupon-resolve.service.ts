import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CouponResolveService implements Resolve<any> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot) {
    const data = {
      titleName: 'เลือกโค้ดส่วนลด meso Code',
      checkbox: true,
    }
    return data;
  }
}
