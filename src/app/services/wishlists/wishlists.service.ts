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
    return data ? JSON.parse(data.value) : [];
  }

  async addToWishlist(product: any): Promise<void> {
    const existingWishlist = await this.getWishlist();
    let updatedWishlist: any;
    if (existingWishlist && existingWishlist.length > 0) {
      console.log("have product", product);

      const checkWishlist = existingWishlist.filter((products: any) => products.id === product.id);
      if (checkWishlist.length > 0) {

        this.removeFromWishlist(product);
      } else {

        updatedWishlist = [...existingWishlist, product];
        this.storage.setStorage(this.wishlistKey, JSON.stringify(updatedWishlist));
      }
    } else {

      updatedWishlist = [product];
      this.storage.setStorage(this.wishlistKey, JSON.stringify(updatedWishlist));
    }

  }

  async removeFromWishlist(product: any): Promise<void> {
    const existingWishlist = await this.getWishlist();
    const updatedWishlist = existingWishlist.filter((products: any) => products.id !== product.id);
    this.storage.setStorage(this.wishlistKey, JSON.stringify(updatedWishlist));
  }
}
