import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { ShopService } from './core/services/shop.service';
import { Book } from './shared/models/book';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'ScriptedSky-client';
  private shopService = inject(ShopService)
  books: Book[] = [];

  ngOnInit(): void {
    this.shopService.getBooks().subscribe({
      next: response => this.books = response.data,
      error: error => console.log(error)
    })
  }
}
