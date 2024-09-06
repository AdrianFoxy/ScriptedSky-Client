import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Book } from '../../shared/models/book';
import { BookItemComponent } from "./book-item/book-item.component";
import { MatDialog } from '@angular/material/dialog';
import { FilteringDialogComponent } from './filtering-dialog/filtering-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    BookItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private shopService = inject(ShopService)
  private dialogService = inject(MatDialog)
  books: Book[] = [];

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-Low', value: 'priceDesc' }
  ]

  shopParams = new ShopParams();

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getGenres();
    this.shopService.getAuthors();
    this.shopService.getPublishers();
    this.shopService.getLanguages();
    this.getBooks();
  }

  getBooks()
  {
    this.shopService.getBooks(this.shopParams).subscribe({
      next: response => this.books = response.data,
      error: error => console.log(error)
    })
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.shopParams.sort = selectedOption.value;
      this.getBooks();
    }
  }

  openFiltresDialog() {
    const dialogRef = this.dialogService.open(FilteringDialogComponent, {
      width: '500px',
      data: {
        selectedGenres: this.shopParams.genres,
        selectedAuthors: this.shopParams.authors,
        selectedPublishers: this.shopParams.publishers,
        selectedLanguages: this.shopParams.languages
      }
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          console.log(result);
          this.shopParams.genres = result.selectedGenres,
          this.shopParams.authors = result.selectedAuthors,
          this.shopParams.publishers = result.selectedPublishers,
          this.shopParams.languages = result.selectedLanguages
          this.getBooks();
        }
      }
    });
  }

}
