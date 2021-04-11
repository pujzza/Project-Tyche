import { ProductCategoriesComponent } from './../product-categories/product-categories.component';
import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import {
  InventoryItem,
  ProductsModel,
  SubProducts,
} from 'src/app/entities/StockModels';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  warehouses = [
    'Chennai',
    'Amritsar',
    'Mumbai',
    'Kolkata',
    'Delhi',
    'Banglore',
    'Hyderabad',
  ];
  product: ProductsModel = new ProductsModel();
  itemList: InventoryItem[] = [];
  subProds: SubProducts[] = [];
  saveError = '';
  noprodcatgerror = '';
  prodfillEroor = '';
  errorIndex = -1;

  constructor(public service: CommonService) {
    this.product.oauth = this.service.Oauth;
  }

  ngOnInit(): void {
    this.service.GetInventory().subscribe((res) => {
      if (res && res.returncode == 200) {
        this.itemList = res.returndata;
      }
    });
  }

  AddProduct() {
    var unsaved = this.subProds.filter((x) => x.isSaved == false).length;
    if (unsaved && unsaved > 0) {
      this.saveError = 'Save all the above items';
    } else {
      this.saveError = '';
      this.product.oauth = this.service.Oauth;
      this.product.Products = this.subProds;

      this.service.AddProduct(this.product).subscribe(
        res => {
          if(res && res.returncode == 200){
            this.service.OpenSnackBar(res.returnmessage,'Success');
            this.subProds = [];
            this.product = new ProductsModel();
          } else {
            this.service.OpenSnackBar(res.returnmessage,'Error');
          }
        },
        (error) =>{
          this.service.OpenSnackBar('Something went wrong !','Sorry');
        }
      );

    }
  }

  AddSubProd() {
    if (this.product.ProductCategory) {
      const prod = new SubProducts();
      this.subProds.push(prod);
      this.noprodcatgerror = '';
    } else {
      this.noprodcatgerror = 'Required';
    }
  }

  DeleteSubProd(index) {
    this.subProds.splice(index, 1);
  }

  saveSubProd(prod,i) {
    const validate = this.validateprod(prod);
    if (!validate) {
      prod['isSaved'] = true;
      this.prodfillEroor = '';
      this.errorIndex = -1;
    } else {
      this.prodfillEroor = 'Fill all details';
      this.errorIndex = i;
    }
  }

  validateprod(prod) {
    if (!prod.ProductCode) {
      return true;
    } else if (!prod.ProductRawMaterials) {
      return true;
    } else if (!prod.ProductMaterial) {
      return true;
    } else if (!prod.ProductSize) {
      return true;
    } else if (!prod.ProductPrice) {
      return true;
    } else {
      return false;
    }
  }
}
