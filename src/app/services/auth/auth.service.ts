import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WoocommerceService } from '../woocommerces/woocommerce.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private router: Router,
    private WC: WoocommerceService,
    private storage: StorageService,

  ) { }

  // Get user session
  async getSession() {
    return (await this.storage.getStorage('uid')).value;
  }

  // Sign in
  async signIn(email: string, password: string) :Promise<any> {
    const response = await this.WC.getLogin(email,password).toPromise();
    const userdata = await this.WC.getUserData(email,password).toPromise();
    await this.storage.setStorage('userID',userdata[0].id);
    console.log('userdata :', userdata);
    console.log('response :', response);
    return await this.storage.setStorage('uid',response.token);
  }

  // Sign up
  async signUp(email: string, password: string) :Promise<any> {
    const response = await this.WC.getLogin(email,password).toPromise();
    const userdata = await this.WC.postRegister(email,password).toPromise();
    await this.storage.setStorage('userID',userdata.id);
    return await this.storage.setStorage('uid',response.token);
  }

  // setUserData(useData) {
  // }

  resetPassword(){}

  // Sign out
  async signOut() {
    this.router.navigateByUrl('/signin');
  }
}
