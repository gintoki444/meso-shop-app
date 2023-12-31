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
  async getCartData(val?: any) {
    let data = await this.storage.getStorage('cart');

    if (data?.value) {
      this.cartData = await JSON.parse(data.value);
      if (!val) this._cart.next(this.cartData);
    }
  }

  // Function plus product
  async quantityPlus(product: any) {
    try {
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
      } else {
        this.removeProduct(product);
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  // Function Add product to cart
  async addToCart(product: any) {
    const getStorages = await this.getCart();
    let item: any = [];

    if (getStorages) {
      this.storeData = JSON.parse(getStorages);
      item = await this.storeData.product.filter((x: any) => x.id == product.id);
    }

    try {

      if (!this.storeData || item.length === 0) {

        product.quantity = 1;
        console.log("storeData =0", product);
      } else {
        item[0].quantity += 1;
        product.quantity = item[0].quantity;

        console.log(product);
      }

      await this.calculate(product);
    } catch (e) {
      console.log(e);
    }
  }


  async removeProduct(product: any) {
    let item: any;
    const getStorages = await this.getCart();
    if (getStorages) {
      this.storeData = JSON.parse(getStorages);
    }

    if (product.length > 1) {
      await product.forEach((data: any) => {
        this.storeData.product = this.storeData.product.filter((x: any) => x.id !== data.id);
      })
      item = await this.storeData.product;
    } else {
      item = await this.storeData.product.filter((x: any) => x.id !== product.id);
    }
    this.storeData.product = item;
    this.storeData.totalItem = 0;
    this.storeData.totalPrice = 0;

    // คำนวณจำนวนสินค้า และ ราคารวม
    await this.storeData.product.forEach((element: any) => {
      this.storeData.totalItem += element.quantity;
      this.storeData.totalPrice += parseFloat(element.price) * parseFloat(element.quantity);
    });

    this.cartData = this.storeData
    await this.saveToCart();

  }

  // Function calculate total product and total price
  async calculate(product: any) {
    const getStorages = await this.getCart();

    this.cartData.product = [];
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;

    if (getStorages) {
      this.storeData = JSON.parse(getStorages);
      let item = await this.storeData.product.filter((x: any) => x.id == product.id);

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
    this.cartData.product.forEach((element: any) => {
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
      if (this.cartData.totalItem === 0) {
        this._cart.next(this.cartData); // Update the observable
        this.clearCart()
      } else {

        // Set data of Capacitor storagev
        await Preferences.set({
          key: 'cart',
          value: JSON.stringify(this.cartData)
        });
        this._cart.next(this.cartData); // Update the observable
      }

    } catch (e) {
      console.log(e);
    }
  }

  // Function Shart data when select product to checkout
  setCartData(data: any) {
    this.selectProducts = data;
  }

  getSetCartData() {
    return this.selectProducts;
  }

  clearCart() {
    this.storage.removeStorage('cart');
  }

}

