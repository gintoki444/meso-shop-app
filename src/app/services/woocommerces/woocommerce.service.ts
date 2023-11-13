import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WoocommerceService {
  // get API From Woocommerce
  apiURL: string = '';
  siteURL: string = 'https://dev-meso.com';
  loginPart: string = '/wp-json/jwt-auth/v1/token';
  woocomPart: string = '/wp-json/wc/v3/';
  consumerKey: string = 'ck_3c58bdd27cd4ff45560b6af98d3fd1b3d649f8e1';
  consumerSecret: string = 'cs_c290c04c763f5f36ace1763a3d08313396378e81';

  constructor(private http: HttpClient) { }

  allProducts: any;
  allCategories: any;
  loginData: any;
  userData:any;
  registerData: any;

  // get All product
  getAllProducts() {
    this.apiURL =
      this.apiURL = `${this.siteURL}${this.woocomPart}products?per_page=50&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.allProducts = this.http.get(this.apiURL);
    console.log("get :", this.apiURL)
    return this.allProducts;
  }

  // get 1 product by id
  getProductDetail(productId: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}products/${productId}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.allProducts = this.http.get(this.apiURL);
    console.log("get :", this.apiURL)
    return this.allProducts;
  }

  // get categories detail by id
  getCategoriesDetail(categoriesId: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}products/categories/${categoriesId}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.allCategories = this.http.get(this.apiURL);
    return this.allCategories;
  }

  // get product by id categories
  getProductByCategory(categoriesId: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}products?category=${categoriesId}&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.allCategories = this.http.get(this.apiURL);
    return this.allCategories;
  }

  // get user Login
  getLogin(username: any, password: any) {
    this.apiURL = `${this.siteURL}${this.loginPart}`;
    this.loginData = this.http.post(
      this.apiURL, {
      username: username,
      password: password,
    }
    );
    return this.loginData;
  }

  // get user Login
  postRegister(username: any, password: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}customers?&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}&email=${username}&username=${username}&password=${password}`;
    this.registerData = this.http.post(
      this.apiURL, {
        username: username,
        email: username,
        password: password,
      }
    );
    return this.registerData;
  }

  // get user data
  getUserData(username: any, password: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}customers?&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}&email=${username}&password=${password}`;
    this.userData = this.http.get(this.apiURL);
    return this.userData;
  }

  // get user data
  getUserDataByID(id:any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}customers/${id}?&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.userData = this.http.get(this.apiURL);
    return this.userData;
  }
}
