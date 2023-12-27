import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';


import { CustomerService } from 'src/app/services/customer/customerservice';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  customer: any;
  imgProfile: any;
  edit_profile_form:any = FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private navController: NavController,
    private actionSheetController: ActionSheetController,
    private customerService: CustomerService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.getCustomer();

    // Setup form
    this.edit_profile_form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', { disabled: true }],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
    });

  }

  // Update profile picture
  async updateProfilePicture() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Choose existing picture or take new',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Choose from gallery',
          icon: 'images',
          handler: () => {
            // Put in logic ...
          }
        },
        {
          text: 'Take picture',
          icon: 'camera',
          handler: () => {
            // Put in logic ...
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }

  async getCustomer() {
    const getCustomer = await this.customerService.getCustomer();
    if(getCustomer){
      
    this.customer = JSON.parse(getCustomer);
    this.imgProfile = this.customer.avatar_url;

    this.edit_profile_form.get('first_name')?.setValue(this.customer!.first_name);
    this.edit_profile_form.get('last_name')?.setValue(this.customer.last_name);
    this.edit_profile_form.get('email')?.setValue(this.customer.email);
    this.edit_profile_form.get('phone')?.setValue(this.customer.billing.phone);
    }
  }

  // Submit form
  async submit() {
    // Proceed with loading overlay
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Recording....',
      spinner: 'crescent'
    });
    await loading.present();
    this.submit_attempt = true;

    // If form valid
    if (this.edit_profile_form.valid) {

      const profileData = {
        first_name: this.edit_profile_form.value.first_name,
        last_name: this.edit_profile_form.value.last_name,
        email: this.edit_profile_form.value.email,
        billing: {
          first_name: this.customer.billing.first_name,
          last_name: this.customer.billing.last_name,
          company: this.customer.billing.company,
          address_1: this.customer.billing.address_1,
          address_2: this.customer.billing.address_2,
          city: this.customer.billing.city,
          postcode: this.customer.billing.postcode,
          country: this.customer.billing.country,
          state: this.customer.billing.state,
          email: this.edit_profile_form.value.email,
          phone: this.edit_profile_form.value.phone,
        },
      }

      // Save form ...
      await this.customerService.updateProfile(this.customer.id, profileData).then(data => {

        loading.dismiss();
        // Display success message and go back
        this.toastService.presentToast('Success', 'Profile saved', 'middle', 'success', 2000);
        // this.navController.back();
        this.route.navigate(['/settings/profile']);
      }).catch(e => {
        console.log(e)
      });

    } else {

      // Display error message
      this.toastService.presentToast('Error', 'Please fill in all required fields', 'top', 'danger', 2000);
    }
  }

}
