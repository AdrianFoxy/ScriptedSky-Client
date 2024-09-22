import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../../shared/models/book';
import { Pagination } from '../../shared/models/pagination';
import { Genre } from '../../shared/models/genre';
import { Author } from '../../shared/models/author';
import { Publisher } from '../../shared/models/publisher';
import { Language } from '../../shared/models/language';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:7217/api/'
  private http = inject(HttpClient)

  genres: Genre[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];
  languages: Language[] = [];

  getBooks(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.genres.length > 0) {
      shopParams.genres.forEach(genre => {
        params = params.append('GenreIds', genre);
      });
    }

    if (shopParams.authors.length > 0) {
      shopParams.authors.forEach(author => {
        params = params.append('AuthorIds', author);
      });
    }

    if (shopParams.publishers.length > 0) {
      shopParams.publishers.forEach(publisher => {
        params = params.append('PublisherIds', publisher);
      });
    }

    if (shopParams.languages.length > 0) {
      shopParams.languages.forEach(language => {
        params = params.append('LanguageIds', language);
      });
    }

    if (shopParams.sort) {
      params = params.append('Sort', shopParams.sort);
    }

    if (shopParams.search) {
      params = params.append('Search', shopParams.search);
    }

    params = params.append('pageSize', shopParams.PageSize);
    params = params.append('pageIndex', shopParams.PageNumber);

    return this.http.get<Pagination<Book>>(this.baseUrl + 'book', { params });
  }

  getBook(id: number){
    return this.http.get<Book>(this.baseUrl + 'book/' + id)
  }

  getGenres() {
    if (this.genres.length > 0) return;
    return this.http.get<Genre[]>(this.baseUrl + 'filtering/genre').subscribe({
      next: response => this.genres = response
    })
  }

  getAuthors() {
    if (this.authors.length > 0) return;
    return this.http.get<Author[]>(this.baseUrl + 'filtering/author').subscribe({
      next: response => this.authors = response
    })
  }

  getPublishers() {
    if (this.publishers.length > 0) return;
    return this.http.get<Publisher[]>(this.baseUrl + 'filtering/publisher').subscribe({
      next: response => this.publishers = response
    })
  }

  getLanguages() {
    if (this.languages.length > 0) return;
    return this.http.get<Language[]>(this.baseUrl + 'Filtering/language').subscribe({
      next: response => this.languages = response
    })
  }

}
