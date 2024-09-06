import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../../shared/models/book';
import { Pagination } from '../../shared/models/pagination';
import { Genre } from '../../shared/models/genre';
import { Author } from '../../shared/models/author';
import { Publisher } from '../../shared/models/publisher';
import { Language } from '../../shared/models/language';

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

  getBooks(genres? : string[], authors? : string[], publishers? : string[], languages?: string[]){
    let params = new HttpParams();

    if (genres && genres.length > 0) {
      params = params.append('GenreIds', genres.join(','));
    }

    if (authors && authors.length > 0) {
      params = params.append('AuthorIds', authors.join(','));
    }

    if (publishers && publishers.length > 0) {
      params = params.append('PublisherIds', publishers.join(','));
    }

    if (languages && languages.length > 0) {
      params = params.append('LanguageIds', languages.join(','));
    }

    return this.http.get<Pagination<Book>>(this.baseUrl + 'book', {params});
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
