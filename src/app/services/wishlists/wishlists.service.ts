import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistsService {
  myWistlists: any = [];

  constructor(
    private storage: StorageService,
  ) { }

  setWishlists(data: any) {
    data.wishlist = true;
    this.myWistlists.push(data);
    this.storage.setStorage('wishlist', this.myWistlists);
  }

  async getWishlists(){
    let data = await this.storage.getStorage('wishlist');
    
    if (data?.value) {
      this.myWistlists = await JSON.parse(data.value);
    }
    return this.myWistlists
  }
}
