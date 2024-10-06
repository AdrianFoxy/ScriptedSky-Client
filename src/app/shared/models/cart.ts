import {nanoid} from 'nanoid'

export type CartType = {
  id: string;
  items: CartItem[];
}

export type CartItem = {
  BookId : number;
  BookName: string;
  Price: number;
  Quantity: number;
  PictureURL: string;
}

export class Cart implements CartType {
  id = nanoid();
  items: CartItem[] = [];
}
