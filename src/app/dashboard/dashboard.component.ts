import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Product[];

 
  
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((data: Product[])=>{
      console.log(data);
      this.products = data;
    });
  }


  public name: string;
  public price: number;
  public rows: Array<{name: string, price: number}> = [];

  buttonClicked() {
    this.rows.push( {name: this.name, price: this.price } );
    this.productService.addProduct(this.name, this.price).subscribe((data: any)=>{
      console.log(data);
      this.showAlert(data);
    });
    //if you want to clear input
    // this.name = null;
    // this.price = null;
  }

  deleteProduct(id: Number){
    this.productService.deleteProduct(id).subscribe((data: any)=>{
      console.log(data);
      this.showAlert(data);
    });

  }

 async showAlert(text: string) {
  var header = document.getElementById('header');
  var headerText = document.getElementById('headerText');
  // elem.style.color = ;
  headerText.textContent= text;
  header.style.backgroundColor= '#00d68f'
  await this.delay(2000);
  headerText.textContent= "Dashboard";
  header.style.backgroundColor= '#ffffff'

}
delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

}
