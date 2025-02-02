import {nanoid} from 'nanoid'

export type CartType = {
  id: string;
  items: CartItem[];
}

export type CartItem = {
  bookId : number;
  bookName: string;
  price: number;
  quantity: number;
  pictureURL: string;
}

export class Cart implements CartType {
  id = nanoid();
  items: CartItem[] = [];
}
