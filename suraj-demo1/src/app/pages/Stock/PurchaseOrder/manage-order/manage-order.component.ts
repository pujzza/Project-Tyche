import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss'],
})
export class ManageOrderComponent implements OnInit {
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  data = [];

  columns = [
    { prop: 'sno', name: 'Sno.' },
    { prop: 'invoiceNo', name: 'Order #' },
    { prop: 'SupplierName', name: 'Supplier Name' },
    { prop: 'SupplierContact', name: 'Supplier Contact' },
    { prop: 'OrderDueDate', name: 'Order Duedate' },
    { prop: 'amount', name: 'Total Amount' },
    { name: 'Settings' },
  ];

  ColumnMode = ColumnMode;
  constructor() {}

  ngOnInit(): void {}
}
