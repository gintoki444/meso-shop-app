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
  displayName: any;
  imgProfile:any;

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

  menuItems = [
    {
      title: 'Home',
      subItems: [
        { title: 'Submenu 1', subItems: [{ title: 'Nested 1' }, { title: 'Nested 2' }] },
        { title: 'Submenu 2', subItems: [{ title: 'Nested 3' }, { title: 'Nested 4' }] },
      ],
    },
    { title: 'About Us' },
    { title: 'Contact Us' },
  ];

  isSubMenuOpen: boolean[] = [];

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
      this.customerData = JSON.parse(data);

      // console.log('this.customerName :',this.customerData.last_name)
      this.imgProfile = this.customerData.avatar_url;
      
      if(this.customerData.first_name && this.customerData.last_name){
        this.displayName = this.customerData.first_name+ ' '+ this.customerData.last_name;
      }else {
        this.displayName = this.customerData.username;
      }
    });
  }

  toggleSubMenu(index: number): void {
    this.isSubMenuOpen[index] = !this.isSubMenuOpen[index];
  }

}
