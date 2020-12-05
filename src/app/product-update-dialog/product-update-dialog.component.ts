import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-product-update-dialog',
  templateUrl: './product-update-dialog.component.html',
  styleUrls: ['./product-update-dialog.component.css']
})
export class ProductUpdateDialogComponent {

  constructor(protected dialogRef: NbDialogRef<ProductUpdateDialogComponent>) {
  }


  cancel() {
    this.dialogRef.close();
  }

  submit(name: string, price: number) {
    var newProduct = {
      name: name,
      price: price
    }
    this.dialogRef.close(newProduct);
  }

}
