import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from 'src/app/services/coupon/coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.page.html',
  styleUrls: ['./coupon.page.scss'],
})
export class CouponPage implements OnInit {

  dataResolve : any;
  couponData: any;
  selectCouponData:any;

  constructor(
    private route: Router,
    private routeActive: ActivatedRoute,
    private couponService: CouponService,
  ) { }

  ngOnInit() {
    this.getCouponList();

    this.dataResolve = this.routeActive.snapshot.data.myarray;
    console.log('dataResolve :',this.dataResolve)
  }

  async getCouponList(){
   const coupon = await this.couponService.getCouponList();
   this.couponData = coupon;
  }

  selectCoupon(coupon: any) {
    if(this.dataResolve.statusCheck === 'select'){
      this.selectCouponData = coupon;
      this.addOrderCoupon();
    }
  }

  async addOrderCoupon() {
    this.couponService.setCouponData(this.selectCouponData);
    this.route.navigate(['checkout'])
  }

  validationCondition(){

  }

}
