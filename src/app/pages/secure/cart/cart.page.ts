import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  iconSearch = '../../../../assets/icon/i-search.svg';
  iconCart = '../../../../assets/icon/i-cart.svg';

  cartItem: any;
  cartData: any;
  productData: any;
  checkboxes: any = [];
  selectAll: boolean = false;
  selectedProducts: any = [];

  totalProducts: any;
  totalPrice: any;



  constructor(
    private cartServices: CartService,
    private cdr: ChangeDetectorRef,
    private rount: Router,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCart();
  }

  toggleAllCheckboxes() {

    // Update all checkboxes based on the value of "selectAll"
    this.checkboxes.forEach((checkbox: any) => {
      checkbox.checked = this.selectAll;
    });

    let selectData = this.checkboxes.filter((checkbox: any) => checkbox.checked);

    this.caculateSelects(selectData)
  }

  updateCheckboxAll() {
    // Update "selectAll" based on the state of individual checkboxes
    this.selectAll = this.checkboxes.every((checkbox: any) => checkbox.checked);

    let selectData = this.checkboxes.filter((checkbox: any) => checkbox.checked);

    this.caculateSelects(selectData)
  }


  quantityPlus(index: any) {
    this.selectAll = false;
    this.totalProducts = 0;
    this.totalPrice = 0;
    this.selectedProducts = [];
    this.cartServices.quantityPlus(index);
  }

  quantityMinus(index: any) {
    this.selectAll = false;
    this.totalProducts = 0;
    this.totalPrice = 0;
    this.selectedProducts = [];
    this.cartServices.quantityMinus(index);
  }


  async getCart() {
    const getCartData = await this.cartServices.getCart();
    if (getCartData) {
      this.cartData = JSON.parse(getCartData);
      this.productData = this.cartData.product


      this.cartServices.cart.subscribe((cart) => {
        if (cart) {
          this.cartItem = cart.totalItem;
          this.cdr.detectChanges();

          this.checkboxes = []
          cart.product.forEach((element: any) => {
            this.checkboxes.push({ id: element.id, checked: false, product: element })
          });
        }
      });
      this.cartServices.getCartData();
    }
  }

  caculateSelects(data: any) {
    this.totalProducts = 0;
    this.totalPrice = 0;

    // คำนวณจำนวนสินค้า และ ราคารวม
    data.forEach((element: any) => {
      this.totalProducts += element.product.quantity;
      this.totalPrice += parseFloat(element.product.price) * parseFloat(element.product.quantity);
    });

    data.totalProduct = this.totalProducts;
    data.totalPrice = this.totalPrice;

    this.selectedProducts = data;
  }

  checkout() {
    let dataToCheckout = { products: this.selectedProducts }
    this.cartServices.setCartData(dataToCheckout)
    this.rount.navigate(['/checkout'])
  }

}
