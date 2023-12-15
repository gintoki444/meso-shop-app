import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.page.html',
  styleUrls: ['./credit-card.page.scss'],
})
export class CreditCardPage implements OnInit {

  creditCardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.creditCardForm = this.fb.group({
      nameCard: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });

    
    this.creditCardForm.get('nameCard').setValue('Cardholder Name');
    this.creditCardForm.get('cardNumber').setValue('4242424242424242');
    this.creditCardForm.get('expiryDate').setValue('12/23');
    this.creditCardForm.get('cvc').setValue('123');
  }


  async submitForm() {
    
    this.markFormGroupTouched(this.creditCardForm);

    if (this.creditCardForm.invalid) {
      // Form is invalid, handle accordingly
      return this.creditCardForm;
    }

    // Your payment processing logic here
    const cardDetails = {
      number: this.creditCardForm.value.cardNumber,
      expiryMonth: this.creditCardForm.value.expiryDate.split('/')[0],
      expiryYear: this.creditCardForm.value.expiryDate.split('/')[1],
      cvc: this.creditCardForm.value.cvc,
    };

    console.log('cardDetails :',cardDetails)

    // Simulate tokenization (replace with actual Omise service)
    const cardToken = await this.tokenizeCard(cardDetails);

    // Save the token for future use
    // this.paymentService.saveCardToken(userId, cardToken);

    // Use the token for the current transaction
    // this.chargeCard(userId);
  }

  private async tokenizeCard(card): Promise<string> {
    // Simulate tokenization (replace with actual Omise service)
    return Promise.resolve('simulated_card_token');
  }

  private chargeCard(userId: string) {
    // const cardToken = this.paymentService.getCardToken(userId);

    // Use the token to create a charge (replace with actual payment service)
    // console.log('Charge user', userId, 'with token', cardToken);
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
