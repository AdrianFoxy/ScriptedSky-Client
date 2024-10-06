import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../../shared/models/cart';
import { Book } from '../../shared/models/book';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  cart = signal<Cart | null>(null);
  itemCount = computed(() => {
    const items = this.cart()?.items || [];
    return items.length;
  });

  getCart(id: string) {
    return this.http.get<Cart>(this.baseUrl + 'cart?id=' + id).pipe(
      map(cart => {
        this.cart.set(cart);
        return cart;
      })
    )
  }

  setCart(cart: Cart) {
    return this.http.post<Cart>(this.baseUrl + 'cart', cart).subscribe({
      next: cart => this.cart.set(cart)
    })
  }

  addItemToCart(item: CartItem | Book, quantity = 1){
    const cart = this.cart() ?? this.createCart()
    if(this.isBook(item)){
      item = this.mapBookToCartItem(item);
    }
    cart.items = this.addOrUpdateItem(cart.items, item, quantity);
    this.setCart(cart);
  }

  private addOrUpdateItem(items: CartItem[], item: CartItem, quantity: number): CartItem[] {
    const index = items.findIndex(x => x.BookId === item.BookId);
    if (index === -1) {
      item.Quantity = quantity;
      items.push(item);
    } else {
      items[index].Quantity += quantity
    }

    return items;
  }

  private mapBookToCartItem(item: Book): CartItem {
    return {
      BookId: item.id,
      BookName: item.title,
      Price: item.price,
      Quantity: 0,
      PictureURL: item.pictureURL
    }
  }

  private isBook(item: CartItem | Book): item is Book{
    return (item as Book).id !== undefined;
  }

  private createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }
}
