import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AddressResolveService implements Resolve<any> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot) {

    const data = {
      titleName: 'ข้อมูลที่อยู่',
      statusCheck:'detail',
      checkform: true,
    }

    return data;
  }

  editResolve() {
    const data = {
      titleName: 'แก้ไขข้อมูลที่อยู่',
      statusCheck:'update',
      checkform: true,
    }

    return data;
  }

  addResolve() {
    const data = {
      titleName: 'เพิ่มข้อมูลที่อยู่',
      statusCheck:'add',
      checkform: true,
    }

    return data;
  }

  selectResolve() {
    const data = {
      titleName: 'เลือกที่อยู่',
      statusCheck:'select',
      checkform: true,
    }

    return data;
  }
}
