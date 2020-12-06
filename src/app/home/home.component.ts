import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { Product } from '../product';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((data: any[])=>{
      console.log(data);
      this.products = data;
    });
  }
  cart: Cart = new Cart();
  add(p: Product){
    this.cart.addItem(p);
  }

}
