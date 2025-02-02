import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Book } from '../../shared/models/book';
import { BookItemComponent } from "./book-item/book-item.component";
import { MatDialog } from '@angular/material/dialog';
import { ShopParams } from '../../shared/models/shopParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component'; 
import { Genre } from '../../shared/models/genre';
import { Author } from '../../shared/models/author';
import { Publisher } from '../../shared/models/publisher';
import { Language } from '../../shared/models/language';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    BookItemComponent,
    MatPaginator,
    FormsModule,
    CommonModule,
    FilterComponent
  ],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  books?: Pagination<Book>;

  genres: Genre[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];
  languages: Language[] = [];

  selectedIdGenres: string[] = [];
  selectedIdAuthors: string[] = [];
  selectedIdPublishers: string[] = [];
  selectedIdLanguages: string[] = [];

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-Low', value: 'priceDesc' }
  ];

  shopParams = new ShopParams();
  pageSizeOptions = [8, 12, 20];

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.getGenreForFilter();
    this.getAuthorForFilter();
    this.getPublisherForFilter();
    this.getLanguagesForFilter();
    this.getBooks();
  }

  getBooks() {
    this.shopService.getBooks(this.shopParams).subscribe({
      next: response => this.books = response,
      error: error => console.log(error)
    });
  }

  onSearchChange() {
    this.shopParams.PageNumber = 1;
    this.getBooks();
  }

  handlePageEvent(event: PageEvent) {
    this.shopParams.PageNumber = event.pageIndex + 1;
    this.shopParams.PageSize = event.pageSize;
    this.getBooks();
  }

  // Sorting
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const dropdown = document.getElementById('dropdown');
    const button = document.getElementById('sortButton');
    if (dropdown && button && !dropdown.contains(event.target as Node) && !button.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }

  onSortChange(sortValue: string) {
    if (sortValue) {
      this.shopParams.sort = sortValue;
      this.shopParams.PageNumber = 1;
      this.getBooks();
    }
  }

  // Filtering

  isFiltersVisible = false;

  toggleFilters() {
    this.isFiltersVisible = !this.isFiltersVisible;
  }

  applyFilters() {
    this.shopParams.genres = this.selectedIdGenres,
    this.shopParams.authors = this.selectedIdAuthors,
    this.shopParams.publishers = this.selectedIdPublishers,
    this.shopParams.languages = this.selectedIdLanguages
    this.shopParams.PageNumber = 1;
    // console.log('Shop Params:', this.shopParams);
    this.getBooks();
  }

  resetFilters() {
    this.selectedIdGenres = [];
    this.selectedIdAuthors = [];
    this.selectedIdPublishers = [];
    this.selectedIdLanguages = [];
  
    this.shopParams.genres = [];
    this.shopParams.authors = [];
    this.shopParams.publishers = [];
    this.shopParams.languages = [];
    this.shopParams.PageNumber = 1;
    // console.log('Filters reset');
    // console.log('Shop Params after reset:', this.shopParams);
    this.getBooks();
  }
  
  onSelectionChange(selectedIds: string[], targetProperty: 'selectedIdGenres' | 'selectedIdAuthors' | 'selectedIdPublishers' | 'selectedIdLanguages') {
    this[targetProperty] = selectedIds;
  }
  
  getGenreForFilter() {
    this.shopService.getGenres().subscribe({
      next: response => this.genres = response,
      error: error => console.log(error)
    });
  }

  getAuthorForFilter() {
    this.shopService.getAuthors().subscribe({
      next: response => this.authors = response,
      error: error => console.log(error)
    });
  }

  getPublisherForFilter() {
    this.shopService.getPublishers().subscribe({
      next: response => this.publishers = response,
      error: error => console.log(error)
    });
  }

  getLanguagesForFilter() {
    this.shopService.getLanguages().subscribe({
      next: response => this.languages = response,
      error: error => console.log(error)
    });
  }
  
}
