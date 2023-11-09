import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  edit_profile_form: FormGroup;
  submit_attempt: boolean = false;

  errorLog: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private navController: NavController,
  ) { }

  ngOnInit() {
    // Setup form
    this.edit_profile_form = this.formBuilder.group({
      password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_new_password: ['', Validators.required],
    });

    // // DEBUG: Prefill inputs
    this.edit_profile_form.get('password').setValue('');
    this.edit_profile_form.get('new_password').setValue('');
    this.edit_profile_form.get('confirm_new_password').setValue('');
  }


  // Submit form
  submit() {

    this.errorLog = false;
    this.submit_attempt = true;

    // If form valid
    if (this.edit_profile_form.valid) {

      // Save form ...

      // Display success message and go back
      this.toastService.presentToast('your password was changed', 'successfully', 'middle', 'success', 2000, 'none');
      this.navController.back();

    } else {

      // Display error message
      this.errorLog = true;
      // this.toastService.presentToast('Error', 'Please fill in all required fields', 'top', 'danger', 2000, 'none');
    }
  }
}
