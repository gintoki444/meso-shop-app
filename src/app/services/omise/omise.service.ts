import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class OmiseService {

  apiURL: string = '';
  private apiUrl = 'https://test.mesoestetic-dev.com';
  // private apiUrltest = 'https://api.omise.co';
  PUBLIC_KEY: string = 'pkey_test_5xxw2i6hksl4xjq0114';
  SECRET_KEY: string = 'skey_test_5xxwd2bsfmfl4kn1pn7';


  dataPayment: any;
  constructor(
    private http: HttpClient,
  ) { }


  createSource(data: any) {
    this.dataPayment = this.http.post(
      `${this.apiUrl}/get-token`, data);

    return this.dataPayment;
  }

  createCharges(data: any) {
    this.dataPayment = this.http.post(
      `${this.apiUrl}/create-charge`, data);
    return this.dataPayment;
  }
  
  getCharges(data: any) {
    this.dataPayment = this.http.get(
      `${this.apiUrl}/getstatus-charge/${data}`);
    return this.dataPayment;
  }
  
  getCardToken(data: any) {
    this.dataPayment = this.http.post(
      `${this.apiUrl}/generate-token`, data);
      // `${this.apiUrl}/generate-token/${data}`);
    return this.dataPayment;
  }
}
