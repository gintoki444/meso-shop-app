import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  async getCart(){
    return (await Preferences.get({key : 'cart'})).value
  }
}

