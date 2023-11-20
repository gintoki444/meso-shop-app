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
  selectAll: false;
  selectedProducts: any = [];

  totalProducts: any;
  totalPrice: any;



  constructor(
    private cartServices: CartService,
    private cdr: ChangeDetectorRef,
    private rount: Router,
  ) { }

  ngOnInit() {
    this.getCart();
  }

  toggleAllCheckboxes() {

    // Update all checkboxes based on the value of "selectAll"
    this.checkboxes.forEach((checkbox) => {
      checkbox.checked = this.selectAll;
    });

    let selectData = this.checkboxes.filter((checkbox) => checkbox.checked);
    console.log(selectData)
    
    this.caculateSelects(selectData)
  }

  updateCheckboxAll() {
    // Update "selectAll" based on the state of individual checkboxes
    this.selectAll = this.checkboxes.every((checkbox) => checkbox.checked);

    let selectData = this.checkboxes.filter((checkbox) => checkbox.checked);
    console.log(selectData)
    
    this.caculateSelects(selectData)
  }


  quantityPlus(index) {
    this.selectAll = false;
    this.totalProducts = 0;
    this.totalPrice = 0;
    this.selectedProducts = [];
    this.cartServices.quantityPlus(index);
  }

  quantityMinus(index) {
    this.selectAll = false;
    this.totalProducts = 0;
    this.totalPrice = 0;
    this.selectedProducts = [];
    this.cartServices.quantityMinus(index);
  }


  async getCart() {
    this.cartData = JSON.parse(await this.cartServices.getCart());
    this.productData = this.cartData.product


    this.cartServices.cart.subscribe((cart) => {
      if (cart) {
        this.cartItem = cart.totalItem;
        this.cdr.detectChanges();

        this.checkboxes = []
        cart.product.forEach(element => {
          this.checkboxes.push({ id: element.id, checked: false, product: element })
          // console.log('id data :',element.id)
        })
        // console.log('checkbox data :',this.checkboxes )
        // console.log('checkbox productData :',this.productData )
      }
    });
    this.cartServices.getCartData();
  }

  caculateSelects(data: any) {
    this.totalProducts = 0;
    this.totalPrice = 0;

    console.log('data',data);
    // คำนวณจำนวนสินค้า และ ราคารวม
    data.forEach(element => {
      // console.log('data', element.product.quantity)
      // console.log('data', element.product.price)
      this.totalProducts += element.product.quantity;
      this.totalPrice += parseFloat(element.product.price) * parseFloat(element.product.quantity);
    });
    // this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);
    // console.log('data',data)
    
    data.totalProduct = this.totalProducts;
    data.totalPrice = this.totalPrice;

    this.selectedProducts = data;
    console.log('selectedProducts',this.selectedProducts);
  }

  checkout() {
    let dataToCheckout = { products: this.selectedProducts }
    this.cartServices.setCartData(dataToCheckout)
    this.rount.navigate(['/checkout'])
  }

}
