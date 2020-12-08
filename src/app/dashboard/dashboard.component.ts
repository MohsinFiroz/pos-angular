import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  products: Product[]  = [];
  loading: boolean = false;


  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }


  constructor(private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loading = true;
    this.productService.getProducts().subscribe((data: Product[])=>{
      console.log(data);
      this.products = data;
      this.loading = false;
    });
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      //remember: [true]
    });
  }


  public name: string;
  public price: number;
  public rows: Array<{name: string, price: number}> = [];

  buttonClicked() {
    this.rows.push( {name: this.name, price: this.price } );
    this.productService.addProduct(this.validateForm.get('name').value, this.validateForm.get('price').value).subscribe((data: any)=>{
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
