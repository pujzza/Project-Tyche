import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { InventoryItem, ProductsModel, SubProducts } from 'src/app/entities/StockModels';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  warehouses = ['Chennai', 'Amritsar','Mumbai', 'Kolkata','Delhi', 'Banglore', 'Hyderabad'];
  product: ProductsModel = new ProductsModel();
  itemList : InventoryItem[] = [];
  subProds : SubProducts[] = [];
  saveError = '';
  noprodcatgerror ='';

  constructor(public service: CommonService) {
    this.product.oauth = this.service.Oauth;
  }

  ngOnInit(): void {
    this.service.GetInventory().subscribe(
      res => {
        if(res && res.returncode == 200){
          this.itemList = res.returndata;
        }
      }
    );
  }

  AddProduct() {
    var unsaved = this.subProds.filter(x => x.isSaved==false).length;
    if(unsaved && unsaved >0){
      this.saveError = "Save all the above items"
    } else {
      this.saveError = ""   
      this.product.oauth = this.service.Oauth;
      this.product.products = this.subProds;
      console.log(this.product)
    }
  }

  AddSubProd(){
    if(this.product.ProductCategory){
      const prod = new SubProducts();
      this.subProds.push(prod);  
      this.noprodcatgerror=''
    } else {
      this.noprodcatgerror = "Required";
    }
  }

  DeleteSubProd(index){
    this.subProds.splice(index, 1);
  }

  saveSubProd(prod){
    prod['isSaved'] = true;
  }
}
