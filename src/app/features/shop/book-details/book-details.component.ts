import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../shared/models/book';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {

  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  book?: Book;

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.shopService.getBook(+id).subscribe({
      next: book => this.book = book,
      error: error => console.log(error)
    })
  }
}
