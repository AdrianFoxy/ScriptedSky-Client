import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Book } from '../../shared/models/book';
import { BookItemComponent } from "./book-item/book-item.component";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    BookItemComponent
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private shopService = inject(ShopService)
  books: Book[] = [];

  ngOnInit(): void {
    this.shopService.getBooks().subscribe({
      next: response => this.books = response.data,
      error: error => console.log(error)
    })
  }
}
