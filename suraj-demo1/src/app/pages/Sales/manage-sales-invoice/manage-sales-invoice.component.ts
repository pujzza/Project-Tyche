import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
} from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { BillHistory, Orders, payAmt } from 'src/app/entities/BillHistoryModel';
import { MetaProducts } from 'src/app/entities/MetaProducts';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manage-sales-invoice',
  templateUrl: './manage-sales-invoice.component.html',
  styleUrls: ['./manage-sales-invoice.component.scss'],
})
export class ManageSalesInvoiceComponent implements OnInit, AfterViewInit {
  MetaProducts = MetaProducts;
  payAmtReq = new payAmt();
  rows = [
    { sno: 1, invoiceNo: 1234, date: '2/2/2020', amount: 4000, status: 'paid' },
  ];
  searchInvoice: any
  loadingIndicator = true;
  disablePay = false;
  reorderable = false;
  data = [];
  orders: Orders[];
  width: any;
  isShowBill = false;
  ispayAmt = false;
  bill = new BillHistory();
  filteredList = [];
  TotalAmt;
  DueAmt;
  columns = [
    { name: 'Sno.',width: 50,headerClass:"theader1" },
    { prop: 'orderid', name: 'Invoice #',width: 100,headerClass:"theader1" },
    { prop: 'firstname', name: 'Name',width: 200,headerClass:"theader1" },
    { prop: 'phonenumber', name: 'Contact #',width: 150,headerClass:"theader1" },
    { prop: 'paidamount', name: 'Paid Amount',width: 150,headerClass:"theader1" },
    { prop: 'totalamount', name: 'Total Amount',width: 150,headerClass:"theader1" },
    // { prop: 'dueAmt', name: 'Due Amount' },
    { name: 'Settings',width: 220,headerClass:"theader1 text-center" },
  ];
  @ViewChild('table', { static: true }) table: ElementRef;
  @ViewChild('showBill', { static: true }) showBill: ElementRef;
  @ViewChild(DatatableComponent) ngxTab: DatatableComponent;
  screenH = 0;

  ColumnMode = ColumnMode;
  employeeId: string;
  errorText: string;
  constructor(public service: CommonService) {
    this.employeeId = localStorage.getItem('UserId').toString();
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.GetOrders();
  }

  GetOrders() {
    const billreq = {
      oauth: this.service.Oauth,
      eid: this.employeeId,
    };
    this.service.GetOrders(billreq).subscribe((res) => {
      if (res.returncode === 200) {
        this.orders = res.orders;
        this.filteredList = res.orders;
        this.orders.map((r) => {
          r.dueAmt = Number(r.totalamount) - Number(r.paidamount);
        });
      }
    });
  }

  downloadBill(orderid){
    const eid = this.employeeId;
    this.service.DownloadBill(eid,orderid);
  }

  getRowIndex(row){
    return (this.ngxTab.bodyComponent.getRowIndex(row) + 1);
  }

  GetBill(orderId){
    let post = {};
    post['oauth'] = this.service.Oauth;
    post['eid'] = this.employeeId;
    post['orderid'] = orderId.toString();
    this.service.GetBillByOrderId(post).subscribe(res => {
      if(res.returncode == 200){
        this.bill = res;
        this.bill.orderid = this.bill.products[0].orderid;
        this.isShowBill = true;
      } else {
        this.isShowBill = false;
      }
    });
  }

  ShowBill(orderId){
    this.GetBill(orderId);
  }

  getMetaPrice(name){
   var prod = this.MetaProducts.filter(x => x.name.includes(name));
   if(prod && prod.length>0){
     return prod[0].price;
   }
  }

  openPayAmt(row){
    this.ispayAmt = true;
    this.payAmtReq.oauth = this.service.Oauth;
    this.payAmtReq.orderid = row.orderid;
    this.TotalAmt = row.totalamount;
    this.DueAmt = row.dueAmt;
  }

  checkPayAmt(){
    if(Number(this.payAmtReq.paidamount) > this.DueAmt)
    {
      this.errorText = 'You have entered Amount more than Due';
      this.disablePay = true;
    } else {
      this.errorText = '';
      this.disablePay = false;
    }
  }

  payDue(){
    this.service.updateAmount(this.payAmtReq).subscribe(res => {
      if(res.returncode == 200){
        this.GetOrders();
        this.ispayAmt = false;
        }
        else {
        }
    })
  }
  getDue(row){
    if(row)
    return Number(row['totalamount']) - Number(row['paidamount'])
    else return 0
  }

  SearchInvoice() {
    const lowerValue = this.searchInvoice.toLowerCase();
    this.filteredList = this.orders.filter(
      (item) =>
        item.orderid.toString().toLowerCase().indexOf(lowerValue) !== -1 ||
        !lowerValue ||
        item.phonenumber.toLowerCase().indexOf(lowerValue) !== -1 ||
        item.firstname.toLowerCase().indexOf(lowerValue) !== -1
    );
  }
}
