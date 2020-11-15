import {Product} from './product';

export class Cart {
    id: number;
    items: Product[] = [];
    total: number = 0;

    addItem(product: Product){
        this.items.push(product);
        this.total += product.price;
    }
  }