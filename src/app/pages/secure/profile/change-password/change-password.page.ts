import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CustomerService } from 'src/app/services/customer/customerservice';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  uid: any;
  cusID: any;
  edit_profile_form: FormGroup;
  submit_attempt: boolean = false;

  errorLog: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private loadingController: LoadingController,
    private navController: NavController,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    // Setup form
    this.edit_profile_form = this.formBuilder.group({
      password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_new_password: ['', Validators.required],
    });
    this.getUserID();



    // // DEBUG: Prefill inputs
    this.edit_profile_form.get('password').setValue('');
    this.edit_profile_form.get('new_password').setValue('');
    this.edit_profile_form.get('confirm_new_password').setValue('');
  }

  async getUserID() {
    const userData = JSON.parse(await this.customerService.getCustomer());
    const cusUid = await this.customerService.getCustomerUID()
    this.cusID = userData.id;
    this.uid = cusUid.value;
  }


  // Submit form
  async submit() {
    this.errorLog = false;
    this.submit_attempt = true;

    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Recording....',
      spinner: 'crescent'
    });
    await loading.present();

    // If form valid
    if (this.edit_profile_form.valid) {
      const data = {
        password: this.edit_profile_form.value.password,
        new_password: this.edit_profile_form.value.new_password,
      };

      // Save form ...
      await this.customerService.changePassword(this.cusID, data, this.uid).then(data => {
        // Display success message and go back
        this.toastService.presentToast('your password was changed', 'successfully', 'middle', 'success', 2000, 'none');
        loading.dismiss();
        this.navController.back();
      }).catch(e => {
        // Display success message and go back
        console.log(e)
        loading.dismiss();
        this.toastService.presentToast('Error', 'รหัสผ่านไม่ถูกต้อง', 'middle', 'danger', 2000, 'none');
      })

    } else {

      // Display error message
      this.errorLog = true;
      // this.toastService.presentToast('Error', 'Please fill in all required fields', 'top', 'danger', 2000, 'none');
    }
  }
}
