import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  rows = [{sno: 1, invoiceNo: 1234, date: '2/2/2020',amount: 4000, status: 'paid',supplier:'Grey Sloan'}];
  loadingIndicator = true;
  reorderable = true;
  data = [];

  columns = [{ prop: 'sno', name:'Sno.' }, { prop: 'invoiceNo', name:'Order #' }, 
  { prop: 'supplier', name:'Supplier Name' }, 
  { prop: 'date', name: 'Invoice Date'},{ prop: 'amount', name: 'Total Amount' },
  { prop: 'status', name:'Status' },{ name: 'Settings' }
];

  ColumnMode = ColumnMode;
  constructor() { }

  ngOnInit(): void {
  }

}
