import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { CartService } from 'src/app/services/cart/cart.service';


//import woo
import { ActivatedRoute } from '@angular/router';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  
  iconSearch = '../../../../assets/icon/i-search.svg';
  iconCart = '../../../../assets/icon/i-cart.svg';
  cartItem: any;

  // รับค่า
  getCategories: any;
  getProduct: any;

  constructor(
    private WC: WoocommerceService,
    private activatedRoute: ActivatedRoute,
    private cartServices: CartService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.getCart();
    this.categoriesDetail();
    this.productCategories();
  }

  async getCart() {
    this.cartServices.cart.subscribe((cart) => {
      if(cart) {
        this.cartItem = cart.totalItem;
        this.cdr.detectChanges(); // Manually trigger change detection
      }
    });
    this.cartServices.getCartData();
  }

  categoriesDetail() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      // get id by param path
      let categoriesID = paramMap.get('categoriesID');
      this.WC.getCategoriesDetail(categoriesID).subscribe((data: any) => {
        this.getCategories = data;
      });
    });
  }
  productCategories() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      // get id by param path
      let categoriesID = paramMap.get('categoriesID');
      this.WC.getProductByCategory(categoriesID).subscribe((data: any) => {
        this.getProduct = data;
      });
    });
  }


}
