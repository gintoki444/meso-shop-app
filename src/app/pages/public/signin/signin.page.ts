import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  current_year: number = new Date().getFullYear();

  signInform: any = FormGroup;
  submit_attempt: boolean = false;
  showPassword: boolean = false;
  showIcon: boolean = false;


  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isLoggedIn();

    // Setup form
    this.signInform = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  async isLoggedIn() {
    try {
      // Proceed with loading overlay
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: 'Loading....',
        spinner: 'crescent'
      });

      await loading.present();
      const val = await this.authService.getSession();

      if (!val) {
        this.loadingController.dismiss();

      } else {
        this.loadingController.dismiss();
        this.router.navigateByUrl('/home');

      }
    } catch (e) {
      this.loadingController.dismiss();
      console.log(e)
    }
  }

  // Sign in
  async signIn() {

    this.submit_attempt = true;
    // If email or password empty
    if (this.signInform.value.email == '' || this.signInform.value.password == '') {
      this.toastService.presentToast('Error', 'Please input email and password', 'top', 'danger', 2000);

    } else {

      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: 'Signing in...Please be patient.',
        spinner: 'crescent'
      });
      await loading.present();

      this.authService.signIn(this.signInform.value.email, this.signInform.value.password).then(data => {
        this.router.navigateByUrl('/home');
        loading.dismiss();
      }).catch(e => {
        this.presentErrorToast("Login failed. Please check your credentials.");
      })
    }
  }

  // Function to display an error toast message
  async presentErrorToast(message: string) {
    this.loadingController.dismiss();
    this.toastService.presentToast('Error', message, 'top', 'danger', 3000);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onPasswordInput() {
    this.showIcon = this.signInform.get('password').value.length > 0;
  }

  signUp() {
    this.router.navigateByUrl('/signup');
  }
}
