import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { CustomerService } from 'src/app/services/customer/customerservice';

import { ChangeDetectorRef } from '@angular/core';
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

  customerData: any;
  customerName: any;

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
    private cdr: ChangeDetectorRef,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.getCustomer();
    this.getCart();
    
  }

  // Sign out
  signOut() {
    this.authService.signOut();
  }

  getCart(){
    this.cartServices.cart.subscribe((cart) => {
      if(cart) {
        this.cartItem = cart.totalItem;
        this.cdr.detectChanges();
      }
    });
    this.cartServices.getCartData();
  }

  async getCustomer(){
    await this.customerService.getCustomer().then(data => {
      // console.log('this.customerName :',data)
      this.customerData = JSON.parse(data);
      console.log('this.customerName :',this.customerData)
      this.customerName = this.customerData.email
    });
  }

}
