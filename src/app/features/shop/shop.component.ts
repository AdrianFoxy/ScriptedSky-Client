import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Book } from '../../shared/models/book';
import { BookItemComponent } from "./book-item/book-item.component";
import { MatDialog } from '@angular/material/dialog';
import { FilteringDialogComponent } from './filtering-dialog/filtering-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Genre } from '../../shared/models/genre';
import { Author } from '../../shared/models/author';
import { Publisher } from '../../shared/models/publisher';
import { Language } from '../../shared/models/language';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    BookItemComponent,
    MatButton,
    MatIcon
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private shopService = inject(ShopService)
  private dialogService = inject(MatDialog)
  books: Book[] = [];

  selectedGenres: string[] = [];
  selectedAuthors: string[] = [];
  selectedPublishers: string[] = [];
  selectedLanguages: string[] = [];

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getGenres();
    this.shopService.getAuthors();
    this.shopService.getPublishers();
    this.shopService.getLanguages();
    this.shopService.getBooks().subscribe({
      next: response => this.books = response.data,
      error: error => console.log(error)
    })
  }

  openFiltresDialog() {
    const dialogRef = this.dialogService.open(FilteringDialogComponent, {
      width: '500px',
      data: {
        selectedGenres: this.selectedGenres,
        selectedAuthors: this.selectedAuthors,
        selectedPublishers: this.selectedPublishers,
        selectedLanguages: this.selectedLanguages
      }
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          console.log(result);
          this.selectedGenres = result.selectedGenres,
          this.selectedAuthors = result.selectedAuthors,
          this.selectedPublishers = result.selectedPublishers,
          this.selectedLanguages = result.selectedPublishers

          this.shopService.getBooks(this.selectedGenres, this.selectedAuthors,
             this.selectedLanguages, this.selectedLanguages).subscribe({
              next : response => this.books = response.data,
              error: error => console.log(error)
             })
        }
      }
    });
  }

}
