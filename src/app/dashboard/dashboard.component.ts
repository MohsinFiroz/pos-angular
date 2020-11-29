import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { InputFilterComponent } from 'ng2-smart-table/lib/components/filter/filter-types/input-filter.component';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Product[];
  source: LocalDataSource;

  settings = {
    columns: {
      id: {
        title: 'ID',
        editable: false,
        addable: false,
      },
      name: {
        title: 'Name'
      },
      price: {
        title: 'Price',
      }
    },
    add: {
      confirmCreate: true,
    }
  };
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.source = new LocalDataSource();
    this.productService.getProducts().subscribe((data: Product[])=>{
      console.log(data);
      this.products = data;
      this.source.load(data);

    });
  }

  addRecord(event) {
    var data = {
      name: event.newData.name,
                price : event.newData.price,
                };
                this.productService.addProduct(data);
                 event.confirm.resolve(event.newData);

  }


}
