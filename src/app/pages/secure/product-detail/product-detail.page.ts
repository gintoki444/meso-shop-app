import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

//import woo
import { ActivatedRoute, Router } from '@angular/router';
import { WoocommerceService } from 'src/app/services/woocommerces/woocommerce.service';

import { CartService } from 'src/app/services/cart/cart.service';
import { WishlistsService } from 'src/app/services/wishlists/wishlists.service';



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
  wishList = '';
  wishlistcheck: boolean = false;
  loadings: boolean = false;
  btnAddtocart: boolean = false;
  cartItem: any = {};
  storeData: any = {};
  id: any;


  swiperModules = [IonicSlides];


  iconLightning = '../../../../assets/icon/i-lightning.svg';
  iconSearch = '../../../../assets/icon/i-search.svg';
  iconCart = '../../../../assets/icon/i-cart.svg';
  iconStar = '../../../../assets/icon/i-star.svg';
  iconWithList = '../../../../assets/icon/i-with-list.svg';
  iconWithListCheck = '../../../../assets/icon/i-with-list-active.svg';

  constructor(
    private WC: WoocommerceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartServices: CartService,
    private cdr: ChangeDetectorRef,
    private wishlistServices: WishlistsService,
  ) { }

  ngOnInit() {
    this.productDetail();
    this.homePageProducts();
    this.wishList = this.iconWithList;
  }

  getCart() {
    this.cartServices.cart.subscribe((cart) => {
      if (cart) {
        this.cartItem = cart.totalItem;
        this.cdr.detectChanges(); // Manually trigger change detection
      }
    });
    this.cartServices.getCartData();
  }

  async productDetail() {
    this.storeData = {};
    this.btnAddtocart = false;

    // Get data of Storage
    let cart: any = await this.getCart();

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      // get id by param path
      let productId = paramMap.get('productID');
      this.id = productId;

      this.WC.getProductDetail(productId).subscribe((data: any) => {
        this.product = data;
        this.productImg = data.images;

        this.getWishlist();
      });
    });

  }

  homePageProducts() {
    this.WC.getAllProducts().subscribe((data: any) => {
      this.allProducts = data;
      this.loadings = true;
    });
  }

  addToCart(product: any) {
    try {
      if (this.loadings === true) {
        this.cartServices.addToCart(product);
        this.btnAddtocart = true;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async viewCart() {
    this.router.navigate(['/', 'cart']);
  }

  getWishlist() {
    this.wishlistServices.getWishlist().then((wishlist: any) => {
      if (wishlist) {
        const checkWishlist = wishlist.filter((products: any) => products.id === this.product.id);
        if (checkWishlist.length > 0 && checkWishlist) {
          this.wishlistcheck = true;
          this.wishList = this.iconWithListCheck;
        }
      }
    });
  }

  addWishList() {
    this.wishlistServices.addToWishlist(this.product).then(() => {
      if (this.wishlistcheck === true) {
        this.wishlistcheck = false;
        this.wishList = this.iconWithList;
      } else {
        this.wishlistcheck = true;
        this.wishList = this.iconWithListCheck;
      }
    });
  }

}
