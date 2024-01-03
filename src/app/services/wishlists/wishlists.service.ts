import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistsService {
  private wishlistKey = 'user_wishlist';
  myWistlists: any = [];

  constructor(
    private storage: StorageService,
  ) { }

  async getWishlist(): Promise<number[]> {
    const data = await this.storage.getStorage(this.wishlistKey);
    return data?.value ? JSON.parse(data.value) : [];
  }

  async addToWishlist(productId: any): Promise<void> {
    const existingWishlist = await this.getWishlist();
    let updatedWishlist: any;
    if (existingWishlist && existingWishlist.length > 0) {

      const checkWishlist = existingWishlist.filter(id => id === productId);
      if (checkWishlist.length > 0) {

        this.removeFromWishlist(productId);
      } else {

        updatedWishlist = [...existingWishlist, productId];
        this.storage.setStorage(this.wishlistKey, JSON.stringify(updatedWishlist));
      }
    } else {

      updatedWishlist = [productId];
      this.storage.setStorage(this.wishlistKey, JSON.stringify(updatedWishlist));
    }

  }

  async removeFromWishlist(productId: number): Promise<void> {
    const existingWishlist = await this.getWishlist();
    const updatedWishlist = existingWishlist.filter(id => id !== productId);
    this.storage.setStorage(this.wishlistKey, JSON.stringify(updatedWishlist));
  }
}
