import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddressResolveService implements Resolve<any> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot) {

    const data = {
      titleName : 'เลือกที่อยู่',
      checkform : true,
    }

    return data;
  }
}
