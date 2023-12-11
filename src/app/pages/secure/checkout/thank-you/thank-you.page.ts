import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.scss'],
})
export class ThankYouPage implements OnInit {
  iconLocation = '../../../../assets/icon/i-location.svg';

  constructor(
    private rout: Router,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getOrder();
  }

  async getOrder() {
    let orderID = await this.activeRoute.paramMap.subscribe(data => {
      let id = data.get('orderID')
      return id
    })
    console.log('orderID :', orderID)
  }

}
