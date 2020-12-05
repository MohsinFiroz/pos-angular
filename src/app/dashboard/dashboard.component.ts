import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { NbDialogService } from '@nebular/theme';
import { ProductUpdateDialogComponent } from '../product-update-dialog/product-update-dialog.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  products: Product[];


  
  constructor(private productService: ProductService, private dialogService: NbDialogService) { }

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
  
  updateProduct(id: Number, newProduct: Product){
    this.productService.updateProduct(id, newProduct).subscribe((data: any)=>{
      console.log(data);
      this.showAlert(data);
    });
  }

  deleteProduct(id: Number){
    this.productService.deleteProduct(id).subscribe((data: any)=>{
      console.log(data);
      this.showAlert(data);
    });
  }

  open(id: number) {
    this.dialogService.open(ProductUpdateDialogComponent)
      .onClose.subscribe(newProduct => newProduct && this.updateProduct(id, newProduct));
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
