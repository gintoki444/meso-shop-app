import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.page.html',
  styleUrls: ['./coupon.page.scss'],
})
export class CouponPage implements OnInit {

  dataResolve : any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    const data = this.route.snapshot.data.myarray;
    if(data){
      this.dataResolve = data;
    }else {
      this.dataResolve = "";
      console.log("dataResolve: ",this.dataResolve)
    }
  }

}
