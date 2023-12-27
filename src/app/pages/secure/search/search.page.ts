import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';


//import woo
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  iconSearch = '../../../../assets/icon/i-search.svg';
  iconCart = '../../../../assets/icon/i-cart.svg';

  // รับค่า
  product: any;
  searchTxt: any;
  cartItem: any;
  searchForm: any = FormGroup;
  searchResults: any[] = [];
  isLoading = false;

  constructor(
    private WC: WoocommerceService,
    private cartServices: CartService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) { }


  ionViewWillEnter() {
    this.Cart();
    this.searchProducts();
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      query: ['']
    });
  }

  async searchProducts() {
    const query = this.searchForm.get('query')?.value;
    this.searchTxt = query;

    if (query) {
      this.isLoading = true;

      this.WC.getSearchProduct(query).subscribe(
        (results: any[]) => {

          this.searchResults = results;
          this.isLoading = false;
        }, (error: any) => {

          console.error('Error searching products:', error);
          this.isLoading = false;
        }
      );
    } else {
      // Clear results if the query is empty
      this.searchResults = [];
    }

    // this.WC.getSearchProduct(data).subscribe((searchData: any) => {
    //   console.log(searchData)
    // });
  }

  async Cart() {
    let getCartData = await this.cartServices.getCart();
    if (getCartData) {
      let cartData = JSON.parse(getCartData);
      this.cartItem = cartData.totalItem;
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }

  ionViewWillLeave() {
    this.searchResults = [];
    this.searchForm.reset();
    this.searchForm.get('query').value = '';
  }

}
