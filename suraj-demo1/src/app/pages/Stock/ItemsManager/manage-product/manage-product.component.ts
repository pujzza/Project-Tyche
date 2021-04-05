import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { ProductsModel } from 'src/app/entities/StockModels';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  loadingIndicator = true;
  reorderable = true;
  data : ProductsModel[] = [];
  ColumnMode = ColumnMode;
  SortType = SortType;
  columns = [
    { prop: 'id', name: '#',width: 10 },
    { prop: 'ProductCode', name: 'Code',width: 50 },
    { prop: 'ProductName', name: 'Product Name',width: 100 },
    { prop: 'ProductCategory', name: 'Category',width: 100 },
    { prop: 'StockUnit', name: 'Quantity',width: 50 },
    { prop: 'ProductRetailPrice', name: 'Retail Price',width: 50 },
    { prop: 'ProductWholesalePrice', name: 'Wholesale Price',width: 70 },
    { name: 'Settings',width: 100 },
  ];
  constructor(public service: CommonService) {}

  ngOnInit(): void {
    document.getElementById('ngxtable').style.height = `${screen.height - 170}px`;
    this.getAllProducts();
  }

  getAllProducts(){
    this.service.GetAllProducts().subscribe(res => {
      if(res && res.returncode == 200){
        this.data = res.returndata;
      }
    })
  }
}
