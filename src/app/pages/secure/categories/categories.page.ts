import { Component, OnInit } from '@angular/core';


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

  // รับค่า
  getCategories: any;
  getProduct: any;

  constructor(
    private WC: WoocommerceService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categoriesDetail();
    this.productCategories();
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
