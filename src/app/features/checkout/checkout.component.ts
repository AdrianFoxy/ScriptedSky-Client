import { Component } from '@angular/core';
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component';
import {MatStepperModule} from '@angular/material/stepper';
import { CheckoutDeliveryComponent } from "./checkout-delivery/checkout-delivery.component";
import { RouterLink } from '@angular/router';
import { CheckoutReviewComponent } from "./checkout-review/checkout-review.component";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    OrderSummaryComponent,
    MatStepperModule,
    CheckoutDeliveryComponent,
    RouterLink,
    CheckoutReviewComponent
],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

}
