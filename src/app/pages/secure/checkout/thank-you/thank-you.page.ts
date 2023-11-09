import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.scss'],
})
export class ThankYouPage implements OnInit {
  iconLocation = '../../../../assets/icon/i-location.svg';

  constructor() { }

  ngOnInit() {
  }

}
