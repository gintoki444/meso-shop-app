import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

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

  cartItem: any;
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
    private authService: AuthService,
    private cartServices: CartService,
  ) { }

  ngOnInit() {
    this.Cart();
  }

  // Sign out
  signOut() {
    this.authService.signOut();
  }
  async Cart(){
    let cartData = JSON.parse(await this.cartServices.getCart());
    this.cartItem = cartData.totalItem
    console.log('cartItem :', this.cartItem)
  }

}
