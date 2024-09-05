import { Component, Input } from '@angular/core';
import { Book } from '../../../shared/models/book';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatChipsModule
  ],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss'
})
export class BookItemComponent {
  @Input() book?: Book;
}
