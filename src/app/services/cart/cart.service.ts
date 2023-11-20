import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';

import { WoocommerceService } from '../woocommerces/woocommerce.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartData: any = {};
  storeData: any = {};
  private _cart = new BehaviorSubject<any>(null);

  selectProducts: any;

  constructor(
    private storage: StorageService,
    private WC: WoocommerceService,
  ) {

  }


  // Function get data storage by cart
  async getCart() {
    return (await this.storage.getStorage('cart')).value;
  }

  // Function update realtime cart
  get cart() {
    return this._cart.asObservable();
  }


  // Function get all data in cart 
  async getCartData(val?) {
    let data = await this.storage.getStorage('cart');

    if (data?.value) {
      this.cartData = await JSON.parse(data.value);
      if (!val) this._cart.next(this.cartData);
    }
  }

  // Function plus product
  async quantityPlus(product: any) {
    try {
      console.log('index', product.stock_quantity)
      if (product.stock_quantity === null) {
        product.quantity += 1;
      } else if (product.quantity < product.stock_quantity) {
        product.quantity += 1;
      }
      await this.calculate(product);
    }
    catch (e) {
      console.log(e)
    }
  }

  // Function Minus product
  async quantityMinus(product: any) {
    try {
      if (product.quantity > 1) {
        product.quantity -= 1
        await this.calculate(product);
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  // Function Add product to cart
  async addToCart(product: any) {
    this.storeData = JSON.parse(await this.getCart());
    let item: any;
    try {
      if (this.storeData) {
        item = await this.storeData.product.filter(x => x.id == product.id);
      }

      if (!this.storeData || item.length == 0) {

        product.quantity = 1;
      } else {
        console.log('item ', item[0].quantity)
        item[0].quantity += 1;
        product.quantity = item[0].quantity;
      }

      await this.calculate(product);
    } catch (e) {
      console.log(e);
    }
  }

  // Function calculate total product and total price
  async calculate(product: any) {
    this.storeData = JSON.parse(await this.getCart());
    this.cartData.product = [];
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;

    if (this.storeData) {
      let item = await this.storeData.product.filter(x => x.id == product.id);

      if (item.length == 0) {
        this.storeData.product.push(product);
        this.cartData.product = this.storeData.product;
      } else {

        // ตั้งค่าจำนวนสินค้า 
        item[0].quantity = product.quantity;
        this.storeData.product[item] = product;
        this.cartData.product = this.storeData.product;
      }
    } else {

      this.cartData.product = [product];
    }

    // คำนวณจำนวนสินค้า และ ราคารวม
    this.cartData.product.forEach(element => {
      this.cartData.totalItem += element.quantity;
      this.cartData.totalPrice += parseFloat(element.price) * parseFloat(element.quantity);
    });
    this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);


    if (this.cartData.totalItem == 0) {
      this.cartData.totalItem = 0;
      this.cartData.totalPrice = 0;
    }
    await this.saveToCart();
  }

  // Function Save data of cart
  async saveToCart() {
    try {
      // Set data of Capacitor storagev
      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(this.cartData)
      });
      this._cart.next(this.cartData); // Update the observable

    } catch (e) {
      console.log(e);
    }
  }

  // Function Shart data when select product to checkout
  setCartData(data:any) {
    this.selectProducts = data;
  }

  getSetCartData(){
    return this.selectProducts;
  }

}

