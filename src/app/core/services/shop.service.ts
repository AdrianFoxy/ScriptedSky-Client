import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../../shared/models/book';
import { Pagination } from '../../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:7217/api/'
  private http = inject(HttpClient)

  getBooks(){
    return this.http.get<Pagination<Book>>(this.baseUrl + 'book');
  }
}
