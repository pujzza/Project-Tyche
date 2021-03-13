import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-manage-sales-invoice',
  templateUrl: './manage-sales-invoice.component.html',
  styleUrls: ['./manage-sales-invoice.component.scss']
})
export class ManageSalesInvoiceComponent implements OnInit,AfterViewInit {
  rows = [{sno: 1, invoiceNo: 1234, date: '2/2/2020',amount: 4000, status: 'paid'}];
  loadingIndicator = true;
  reorderable = false;
  data = [];
  width: any;

  columns = [{ prop: 'sno', name:'Sno.' }, { prop: 'invoiceNo', name:'Invoice #' }, 
  { prop: 'date', name: 'Invoice Date'},{ prop: 'amount', name: 'Total Amount' },
  { prop: 'status', name:'Status' },{ name: 'Settings' }
];
@ViewChild('table', { static: true }) table: ElementRef;

  ColumnMode = ColumnMode;
  constructor() { }
  ngAfterViewInit(): void {
   var element : HTMLElement = this.table.nativeElement;
  }

  ngOnInit(): void {
  }

}
