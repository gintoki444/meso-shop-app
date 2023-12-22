import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.page.html',
  styleUrls: ['./credit-card.page.scss'],
})
export class CreditCardPage implements OnInit {

  creditCardForm: FormGroup;

  visaIcon = '../../../../assets/icon/visa-payment.svg';
  scbIcon = '../../../../assets/icon/scb-payment.svg';
  unionIcon = '../../../../assets/icon/union-payment.svg';
  mastercardIcon = '../../../../assets/icon/master-card-payment.svg';

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private route: Router,
    private activatedRoute :ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.creditCardForm = this.fb.group({
      nameCard: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });


    // this.creditCardForm.get('nameCard').setValue('Cardholder Name');
    // this.creditCardForm.get('cardNumber').setValue('4242424242424242');
    // this.creditCardForm.get('expiryDate').setValue('12/23');
    // this.creditCardForm.get('cvc').setValue('123');
  }


  async submitForm() {
    let paymentData = await this.paymentService.getPaymentData();

    this.markFormGroupTouched(this.creditCardForm);

    if (this.creditCardForm.invalid) {
      return this.creditCardForm;
    }

    const cardDetails = {
      name: this.creditCardForm.value.nameCard,
      number: this.creditCardForm.value.cardNumber,
      expiryMonth: this.creditCardForm.value.expiryDate.split('/')[0],
      expiryYear: this.creditCardForm.value.expiryDate.split('/')[1],
      security_code: this.creditCardForm.value.cvc,
    };

    await this.paymentService.createCardToken(cardDetails).then(data => {
      if (data) {
        paymentData.token = data.id;


        let id = this.activatedRoute.snapshot.paramMap.get('orderID');
        if (!id) {
          this.route.navigate(['checkout']);
        } else {
          this.route.navigate(['confirm-order']);
        }
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
