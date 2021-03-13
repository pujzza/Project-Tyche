import { Component, OnInit } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  rows = [
    { sno: 1, prodName: 'A4 Paper', qty: 3000, code: 'P-A4', catg: 'Paper' ,price: 200 },
    { sno: 2, prodName: 'A3 Paper', qty: 300, code: 'P-A3', catg: 'Paper' ,price: 90 },
    { sno: 8, prodName: 'A4 Paper', qty: 3000, code: 'P-A4', catg: 'Paper' ,price: 9 },
  ];
  loadingIndicator = true;
  reorderable = true;
  data = [];

  columns = [
    { prop: 'sno', name: '#' },
    { prop: 'prodName', name: 'Product Name' },
    { prop: 'qty', name: 'Quantity' },
    { prop: 'code', name: 'Code' },
    { prop: 'catg', name: 'Category' },
    { prop: 'price', name: 'Price' },
    { name: 'Settings' },
  ];
  colWidth = (100 / this.columns.length)

  ColumnMode = ColumnMode;
  SortType = SortType;
  constructor() {}

  ngOnInit(): void {}
}
