import { Component, OnInit } from '@angular/core';

//import woo
import { ActivatedRoute, Router } from '@angular/router';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';

import { Preferences } from '@capacitor/preferences';



import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  // รับค่า
  product: any = [];
  productImg: any;
  allProducts: any = [];

  // Add to cart and StoreData
  btnAddtocart: Boolean = false;
  cartData: any = {};
  storeData: any = {};
  id: any;


  swiperModules = [IonicSlides];


  iconLightning = '../../../../assets/icon/i-lightning.svg';
  iconSearch = '../../../../assets/icon/i-search.svg';
  iconCart = '../../../../assets/icon/i-cart.svg';
  iconStar = '../../../../assets/icon/i-star.svg';
  iconWithList = '../../../../assets/icon/i-with-list.svg';

  constructor(
    private WC: WoocommerceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.productDetail();
    this.homePageProducts();
  }

  getCart() {
    return Preferences.get({ key: 'cart' });
  }

  async productDetail() {
    this.cartData = {};
    this.storeData = {};
    this.btnAddtocart = false;

    // Get data of Storage
    let cart: any = await this.getCart();

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      // get id by param path
      let productId = paramMap.get('productID');
      this.id = productId;

      console.log('Found Product Id: ', productId);
      this.WC.getProductDetail(productId).subscribe((data: any) => {
        this.product = data;
        this.productImg = data.images;
        console.log('Product Data: ', this.product);
      });
    });

    if (cart?.value) {
      this.storeData = JSON.parse(cart.value);
      console.log('store Data: ', this.storeData);
    }
  }

  homePageProducts() {
    this.WC.getAllProducts().subscribe((data: any) => {
      this.allProducts = data;
      console.log('All Products: ', this.allProducts);
    });
  }

  addToCart() {
    try {
      if (!this.product.quantity || this.product.quantity == 0) {
        this.product.quantity = 1;
        this.calculate();
      } else {
        this.product.quantity += 1;
        this.calculate();
      }
      this.btnAddtocart = true;
    } catch (e) {
      console.log(e);
    }
  }

  async calculate() {
    console.log("product :", this.product)
    console.log('store Data: ', this.storeData.product);
    this.cartData.product = [];
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;

    if (this.storeData.product) {
      let item = this.storeData.product.filter(x => x.id == this.id);

      if (item.length == 0) {
        this.storeData.product.push(this.product);
        this.cartData.product = this.storeData.product;
        console.log("storeData push :", this.cartData);
      } else {
        console.log("Dont  push :", [this.product])
        console.log("item :", item)
        console.log('item.id ',item[0].id);
        console.log('item.quantity ',item[0].quantity);
        item[0].quantity = item[0].quantity+1;
        this.storeData.product[item] = item;
        console.log('storeData ',this.storeData);
        this.cartData.product = this.storeData.product;
      }
    } else {

      console.log("Dont All :", [this.product])
      this.cartData.product = [this.product];
    }


    this.cartData.product.forEach(element => {
      this.cartData.totalItem += element.quantity;
      this.cartData.totalPrice += parseFloat(element.price) * parseFloat(element.quantity);
    });

    this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);


    if (this.cartData.totalItem == 0) {
      this.cartData.totalItem = 0;
      this.cartData.totalPrice = 0;
    }
    console.log('cart : total', this.cartData);

    await this.saveToCart();

  }

  async saveToCart() {
    try {
      // this.cartData.cart = {};
      // this.cartData.cart = this.product;
      // console.log('cart : total', this.cartData);

      // Set data of Capacitor storagev
      this.storeData.totalItem = this.cartData.totalItem;
      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(this.cartData)
      });

    } catch (e) {
      console.log(e);
    }
  }

  async viewCart() {
    if (this.cartData.product) await this.saveToCart();
    this.router.navigate(['/', 'cart']);
  }

}
