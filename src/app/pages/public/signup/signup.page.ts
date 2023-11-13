import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  current_year: number = new Date().getFullYear();

  signup_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    
    // Setup form
    this.signup_form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password_repeat: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    // DEBUG: Prefill inputs
    this.signup_form.get('email').setValue('');
    this.signup_form.get('password').setValue('');
  }

  // Sign up
  async signUp() {

    this.submit_attempt = true;

    // If email or password empty
    if (this.signup_form.value.email == '' || this.signup_form.value.password == '' || this.signup_form.value.password_repeat == '') {
      this.toastService.presentToast('Error', 'Please fill in all fields', 'top', 'danger', 4000);

      // If passwords do not match
    } else if (this.signup_form.value.password != this.signup_form.value.password_repeat) {
      this.toastService.presentToast('Error', 'Passwords must match', 'top', 'danger', 4000);

    } else {

      // Proceed with loading overlay
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: 'Signing up... Please be patient.',
        spinner: 'crescent'
      });
      await loading.present();

      // TODO: Add your sign up logic
      // ...
      this.authService.signUp(this.signup_form.value.email, this.signup_form.value.password).then(data => {
        console.log("data", data)
        this.router.navigateByUrl('/home');
        loading.dismiss();
      }).catch(e => {
        this.presentErrorToast("Sigup failed. Please check your credentials.");
      })

      // Success messages + routing
      this.toastService.presentToast('Welcome!', 'Lorem ipsum', 'top', 'success', 2000);
      await this.router.navigate(['/home']);
      loading.dismiss();
    }
  }

  signIn(){
    this.router.navigateByUrl('/signin');
  }

  // Function to display an error toast message
  async presentErrorToast(message: string) {
    this.loadingController.dismiss();
    this.toastService.presentToast('Error', message, 'top', 'danger', 3000);
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

      }else{
        this.loadingController.dismiss();
        this.router.navigateByUrl('/home');
        
      }
    } catch (e) {
      this.loadingController.dismiss();
      console.log(e)
    }
  }

}
