import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WoocommerceService } from '../woocommerces/woocommerce.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private router: Router,
    private WC: WoocommerceService

  ) { }

  // Get user session
  async getSession() {

    // ...
    // put auth session here
    // ...

    // Sample only - remove this after real authentication / session
    let session = {
      email: 'john.doe@mail.com'
    }

    return false;
    // return session;
  }

  // Sign in
  async signIn(email: string, password: string) :Promise<any> {

    // Sample only - remove this after real authentication / session
    // let sample_user = {
    //   email: email,
    //   password: password
    // }

    // return sample_user;
  }

  // Sign up
  async signUp(email: string, password: string) {
    // Sample only - remove this after real authentication / session
    let sample_user = {
      email: email,
      password: password
    }

    return sample_user;
  }

  setUserData(useData) {

  }

  // Sign out
  async signOut() {
    // ...
    // clean subscriptions / local storage etc. here
    // ...

    // Navigate to sign-in
    this.router.navigateByUrl('/signin');
  }
}
