import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmiseService {

  apiURL: string = '';
  private apiUrl = 'https://api.omise.co';
  // siteURLSources: string = 'https://api.omise.co/sources';
  // siteURLChange: string = 'https://api.omise.co/charges';
  PUBLIC_KEY: string = 'pkey_test_5xxw2i6hksl4xjq0114';
  SECRET_KEY: string = 'skey_test_5xxwd2bsfmfl4kn1pn7';


  dataPayment: any;
  constructor(
    private http: HttpClient
  ) { }

  // createSource(sourceData: any){
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Basic ' + this.PUBLIC_KEY + ':',
  //   });
  //   this.dataPayment = this.http.post<any>(`${this.apiUrl}/sources`, sourceData, { headers })

  //   return this.dataPayment;
  // }

  // createCharge(amount: number, currency: string, cardToken: string): Observable<any> {
  createSource(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Basic ' + btoa(this.PUBLIC_KEY + ':'),
    });

    // console.log(btoa(this.PUBLIC_KEY + ':'))

    // const body = `amount=${amount}&currency=${currency}&type=mobile_banking_kbank`;
    this.dataPayment = this.http.post(
      `${this.apiUrl}/sources`, data, { headers });

    return this.dataPayment;
  }
  
  createCharges(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Basic ' + btoa(this.SECRET_KEY + ':'),
    });

    // console.log(btoa(this.PUBLIC_KEY + ':'))

    // const body = `amount=${amount}&currency=${currency}&type=mobile_banking_kbank`;
    this.dataPayment = this.http.post(
      `${this.apiUrl}/charges`, data, { headers });

    return this.dataPayment;
  }
}
