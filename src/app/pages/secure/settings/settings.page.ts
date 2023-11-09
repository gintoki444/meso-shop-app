import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  iconCart = '../../../../assets/icon/i-cart.svg';
  iconWithList = '../../../../assets/icon/i-with-list-active.svg';
  iconOrderPay = '../../../../assets/icon/i-order-payment.svg';
  iconOrderSend = '../../../../assets/icon/i-order-send.svg';
  iconOrderReview = '../../../../assets/icon/i-order-review.svg';

  pages = [
    {
      title: 'ตั้งค่าบัญชี',
      children: [
        {
          title:'โปรไฟล์',
          url: 'settings/profile',
        },
        {
          title:'ที่อยู่ของฉัน',
          url: 'address',
        },
        {
          title:'เปลี่ยนรหัสผ่าน',
          url: 'profile/change-password',
        }
      ]
    }
  ]

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  // Sign out
  signOut() {
    this.authService.signOut();
  }

}
