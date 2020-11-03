import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ProductService } from '../product.service';
import {Product} from '../product'

@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
products: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((data: any[])=>{
      console.log(data);
      this.products = data;
    })
  }


}
