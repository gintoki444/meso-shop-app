import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class OmiseService {

  apiURL: string = '';
  private apiUrl = 'http://localhost:5001';
  // private apiUrl = 'https://api.omise.co';
  // PUBLIC_KEY: string = 'pkey_test_5xxw2i6hksl4xjq0114';
  // SECRET_KEY: string = 'skey_test_5xxwd2bsfmfl4kn1pn7';


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
    console.log('createCharges',data)
    this.dataPayment = this.http.post(
      `${this.apiUrl}/create-charge`, data);
    return this.dataPayment;
  }

  async getRequest() {
    this.dataPayment = this.http.get('http://localhost:5001/testgetopn');
    return this.dataPayment;
  }

  // async getOPN() {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json; charset=utf-8',
  //     'Authorization': 'Basic ' + btoa(this.SECRET_KEY + ':'),
  //   });

  //   const url = `https://api.omise.co/charges/chrg_test_5y288klnnzwwvqnyrl7`;

  //   const response = await this.http.get(
  //     url, { headers });

  //   // const response: HttpResponse = await CapacitorHttp.get(testGet);

  //   return response;
  // }
}
