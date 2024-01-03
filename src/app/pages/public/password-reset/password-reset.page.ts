import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})

export class PasswordResetPage implements OnInit {

  resetForm: any = FormGroup;
  current_year: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
    });
  }

}
