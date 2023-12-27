import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  userData: any;
  registerData: any;
  OrderrData: any;
  couponData: any;
  paymentData: any;
  customerData: any;

  // get All product
  getAllProducts() {
    this.apiURL =
      this.apiURL = `${this.siteURL}${this.woocomPart}products?per_page=50&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.allProducts = this.http.get(this.apiURL);
    return this.allProducts;
  }

  // search product
  getSearchProduct(data: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}products/?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    const params = { search: data }
    this.allProducts = this.http.get(this.apiURL, { params });
    return this.allProducts;
  }

  // get 1 product by id
  getProductDetail(productId: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}products/${productId}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.allProducts = this.http.get(this.apiURL);
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

    // console.log("data", this.apiURL)
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
  getUserDataByID(id: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}customers/${id}?&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.userData = this.http.get(this.apiURL);
    return this.userData;
  }


  // update data user
  putCustomer(id: any, data: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}customers/${id}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;

    this.userData = this.http.put(this.apiURL,
      {
        meta_data: [data]
      }
    );
    return this.userData;
  }


  // update data user
  putCustomerProfile(id: any, data: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}customers/${id}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.userData = this.http.put(this.apiURL, data);
    return this.userData;
  }

  // get order data by customer ID
  getOrderByCustomerID(id: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}orders?customer=${id}&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.userData = this.http.get(this.apiURL);
    return this.userData;
  }


  // get user data
  getOrderByID(id: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}orders/${id}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.userData = this.http.get(this.apiURL);
    return this.userData;
  }

  postOrders(orders: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}orders?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.OrderrData = this.http.post(
      this.apiURL, orders);
    // console.log('OrderrData wc ',this.OrderrData)
    return this.OrderrData;
  }

  putOrders(id: any, status: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}orders/${id}?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.OrderrData = this.http.post(
      this.apiURL, status);
    return this.OrderrData;
  }

  getcouponList() {
    this.apiURL = `${this.siteURL}${this.woocomPart}coupons?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.couponData = this.http.get(this.apiURL);
    // console.log('OrderrData wc ',this.OrderrData)
    return this.couponData;
  }

  // get user data
  getPaymentGateway() {
    this.apiURL = `${this.siteURL}${this.woocomPart}payment_gateways?&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.paymentData = this.http.get(this.apiURL);
    return this.paymentData;
  }

  // get user data
  changePassword(id: any, data: any) {
    this.apiURL = `${this.siteURL}${this.woocomPart}customers/${id}?&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    this.customerData = this.http.post(
      this.apiURL, data);
    return this.customerData;
  }


}
