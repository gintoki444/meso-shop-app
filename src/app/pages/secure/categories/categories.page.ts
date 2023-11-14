import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit() {
    this.Cart();
    this.categoriesDetail();
    this.productCategories();
  }

  async Cart(){
    let cartData = JSON.parse(await this.cartServices.getCart());
    this.cartItem = cartData.totalItem
    console.log('cartItem :', this.cartItem)
  }

  categoriesDetail() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      // get id by param path
      let categoriesID = paramMap.get('categoriesID');
      this.WC.getCategoriesDetail(categoriesID).subscribe((data: any) => {
        this.getCategories = data;
        console.log('categoriesID Data: ', this.getCategories);
      });
    });
  }
  productCategories() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      // get id by param path
      let categoriesID = paramMap.get('categoriesID');
      this.WC.getProductByCategory(categoriesID).subscribe((data: any) => {
        this.getProduct = data;
        console.log('product Data: ', this.getProduct);
      });
    });
  }


}
