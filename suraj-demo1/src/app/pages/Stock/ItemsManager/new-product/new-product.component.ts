import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { ProductsModel } from 'src/app/entities/StockModels';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  warehouses = ['Chennai', 'Amritsar','Mumbai', 'Kolkata','Delhi', 'Banglore', 'Hyderabad'];
  product: ProductsModel = new ProductsModel();
  constructor(public service: CommonService) {
    this.product.oauth = this.service.Oauth;
  }

  ngOnInit(): void {}

  AddProduct() {
    this.service.AddProduct(this.product).subscribe(
      (res) => {
        if (res && res.returncode == 200) {
          this.service.OpenSnackBar('Product Created!', 'SUCCESS');
          this.product = new ProductsModel();
        } else {
          this.service.OpenSnackBar('Product not created!', 'FAILED');
        }
      },
      (error) => {
        this.service.OpenSnackBar('Something went wrong', 'SORRY');
      }
    );
  }
}
