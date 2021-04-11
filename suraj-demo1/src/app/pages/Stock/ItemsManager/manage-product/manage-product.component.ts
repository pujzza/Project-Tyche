import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { ProductsModel, SubProducts } from 'src/app/entities/StockModels';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  loadingIndicator = true;
  reorderable = true;
  data : SubProducts[] = [];
  ColumnMode = ColumnMode;
  SortType = SortType;
  filteredList = [];
  searchProduct;
  columns = [
    { prop: 'ProductId', name: '#',width: 10 },
    { prop: 'ProductCode', name: 'Code',width: 50 },
    { prop: 'ProductCategory', name: 'Category',width: 100 },
    { prop: 'ProductPrice', name: 'Price',width: 50 },
    { prop: 'ProductMaterial', name: 'Material',width: 100 },
    { prop: 'ProductSize', name: 'Size',width: 50 },
    { name: 'Settings',width: 100 },
  ];
  constructor(public service: CommonService) {
  }

  ngOnInit(): void {
    document.getElementById('ngxtable').style.height = `${screen.height - 170}px`;
    this.getAllProducts();
  }

  getAllProducts(){
    this.service.GetAllProducts().subscribe(res => {
      if(res && res.returncode == 200){
        this.data = res.returndata;
        this.filteredList = res.returndata;
      }
    })
  }

  SearchProduct() {
    const lowerValue = this.searchProduct.toLowerCase();
    this.filteredList = this.data.filter(item => 
      item.ProductCode.toLowerCase().indexOf(lowerValue) !== -1 || !lowerValue
      || item.ProductMaterial.toLowerCase().indexOf(lowerValue) !== -1
      || item.ProductSize.toLowerCase().indexOf(lowerValue) !== -1
      );
  }
}
