import { Component, inject, signal } from '@angular/core';
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component';
import { MatStepperModule} from '@angular/material/stepper';
import { CheckoutDeliveryComponent } from "./checkout-delivery/checkout-delivery.component";
import { Router, RouterLink } from '@angular/router';
import { CheckoutReviewComponent } from "./checkout-review/checkout-review.component";
import { SnackbarService } from '../../core/services/snackbar.service';
import { JsonPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    OrderSummaryComponent,
    MatStepperModule,
    CheckoutDeliveryComponent,
    RouterLink,
    CheckoutReviewComponent,
    JsonPipe  
],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  completionStatus = signal<{ delivery: boolean }>({ delivery: false });
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  cartService = inject(CartService);

  handleConfirmOrder() {
    this.cartService.deleteCart();
    this.cartService.selectedDelivery.set(null);
    
    this.snackbar.success('Order confirmed');
    this.router.navigateByUrl('/checkout/success'); 
  }

  handleDeliveryChange(event: boolean) {
    this.completionStatus.update(state => {
      state.delivery = event;
      return state;
    });

  }
}
