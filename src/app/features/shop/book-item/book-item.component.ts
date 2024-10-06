import { Component, inject, Input } from '@angular/core';
import { Book } from '../../../shared/models/book';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatChipsModule,
    RouterLink
  ],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss'
})
export class BookItemComponent {
  @Input() book?: Book;
  cartService = inject(CartService);
}
