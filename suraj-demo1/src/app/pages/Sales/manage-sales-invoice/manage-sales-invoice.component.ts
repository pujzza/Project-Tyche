import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  ViewContainerRef,
  ComponentFactory,
  ComponentRef,
  EmbeddedViewRef,
  Injector,
  NgModuleRef,
  ViewRef,
  ChangeDetectorRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { BillHistory, Orders, payAmt } from 'src/app/entities/BillHistoryModel';
import { MetaProducts } from 'src/app/entities/MetaProducts';
import { CommonService } from 'src/app/services/common.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-manage-sales-invoice',
  templateUrl: './manage-sales-invoice.component.html',
  styleUrls: ['./manage-sales-invoice.component.scss'],
})
export class ManageSalesInvoiceComponent implements OnInit, AfterViewInit {
  // Meta
  MetaProducts = MetaProducts;
  ColumnMode = ColumnMode;

  // Object Variables
  payAmtReq = new payAmt();
  bill = new BillHistory();

  // Any Variables
  searchInvoice: any;
  htmlCanva: any;
  width: any;
  TotalAmt: any;
  datefilter: any;
  DueAmt: any;

  // Boolean Variables
  isShowBill = false;
  ispayAmt = false;
  isScreenCapture = false;
  loadingIndicator = true;
  disablePay = false;
  reorderable = false;
  isloading = true;

  // String Variables
  employeeId: string;
  errorText: string;

  // Number Variabless
  screenH = 0;

  // Array Variables
  filteredList = [];
  data = [];
  orders: Orders[];
  columns = [
    { name: 'Sno.', width: 1, headerClass: 'theader1' },
    { prop: 'orderid', name: 'Invoice #', width: 1, headerClass: 'theader1' },
    { prop: 'firstname', name: 'Name', width: 1, headerClass: 'theader1' },
    {
      prop: 'phonenumber',
      name: 'Contact #',
      width: 1,
      headerClass: 'theader1',
    },
    {
      prop: 'paidamount',
      name: 'Paid Amount',
      width: 1,
      headerClass: 'theader1',
    },
    {
      prop: 'totalamount',
      name: 'Total Amount',
      width: 1,
      headerClass: 'theader1',
    },
    {
      prop: 'orderDate',
      name: 'Order Date',
      width: 1,
      headerClass: 'theader1',
    },
    { name: 'Settings', width: 1, headerClass: 'theader1 text-center' },
  ];

  // ViewChilds
  @ViewChild('table', { static: true }) table: ElementRef;
  @ViewChildren('allTheseThings') things: QueryList<any>;
  @ViewChild('showBill', { static: false }) showBill: ElementRef;
  @ViewChild(DatatableComponent) ngxTab: DatatableComponent;

  constructor(
    public service: CommonService,
    private changeDetectorRef: ChangeDetectorRef,private route: Router
  ) {
    this.employeeId = localStorage.getItem('UserId').toString();
  }

  ngAfterViewInit(): void {
    this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
  }

  ngOnInit(): void {
    if (this.table) {
      this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
    }
    this.GetOrders();
  }

  // API - To get the list of Orders
  GetOrders() {
    const billreq = {
      oauth: this.service.Oauth,
      eid: this.employeeId,
    };
    this.service.GetOrders(billreq).subscribe((res) => {
      if (res.returncode === 200) {
        res.orders.forEach((ele) => {
          ele.orderDate = formatDate(ele.orderDate, 'dd/MM/yyyy', 'en-US');
        });
        this.orders = res.orders;
        this.filteredList = res.orders;
        this.orders.map((r) => {
          r.dueAmt = Number(r.totalamount) - Number(r.paidamount);
        });
        this.isloading = false;
      }
    });
  }

  downloadBill(order) {
    const eid = this.employeeId;
    this.service.downloadOrder=order;
    // this.service.DownloadBill(eid, orderid);
    this.route.navigateByUrl(`Home/Sales/InvoiceTemplate/${order.orderid}`);
    // this.route.navigateByUrl('' , orderid);
    // this.ShowBill(orderid);
    // this.isShowBill = true;
    // this.changeDetectorRef.detectChanges();
    // this.screenCapture();
  }

  getRowIndex(row) {
    return this.ngxTab.bodyComponent.getRowIndex(row) + 1;
  }

  // API - To get the invoice details based on OrderID
  GetBill(orderId) {
    let post = {};
    post['oauth'] = this.service.Oauth;
    post['eid'] = this.employeeId;
    post['orderid'] = orderId.toString();
    this.service.GetBillByOrderId(post).subscribe((res) => {
      if (res.returncode == 200) {
        this.bill = res;
        this.bill.orderid = this.bill.products[0].orderid;
        this.isShowBill = true;
      } else {
        this.isShowBill = false;
      }
    });
    this.changeDetectorRef.detectChanges();
  }

  // To view Download bill
  ShowBill(order) {
    const eid = this.employeeId;
    this.service.downloadOrder=order;
    this.route.navigateByUrl(`Home/Sales/InvoiceTemplate/${order.orderid}`);
  }

  getMetaPrice(name) {
    var prod = this.MetaProducts.filter((x) => x.name.includes(name));
    if (prod && prod.length > 0) {
      return prod[0].price;
    }
  }


  // Open Payment model box
  openPayAmt(row) {
    this.ispayAmt = true;
    this.payAmtReq.oauth = this.service.Oauth;
    this.payAmtReq.orderid = row.orderid;
    this.TotalAmt = row.totalamount;
    this.DueAmt = row.dueAmt;
  }

  // To check if the amount entered is more than due amt.
  checkPayAmt() {
    if (Number(this.payAmtReq.paidamount) > this.DueAmt) {
      this.errorText = 'You have entered Amount more than Due';
      this.disablePay = true;
    } else {
      this.errorText = '';
      this.disablePay = false;
    }
  }

  // API - Pay due amount
  payDue() {
    this.service.updateAmount(this.payAmtReq).subscribe((res) => {
      if (res.returncode == 200) {
        this.GetOrders();
        this.ispayAmt = false;
      } else {
        this.payAmtReq = new payAmt();
      }
    });
  }

  // To get the Due Value
  getDue(row) {
    if (row) return Number(row['totalamount']) - Number(row['paidamount']);
    else return 0;
  }

  // Search Filter - No date
  SearchInvoice() {
    const lowerValue = this.searchInvoice.toLowerCase();
    this.filteredList = this.orders.filter(
      (item) =>
        item.orderid.toString()?.toLowerCase().indexOf(lowerValue) !== -1 ||
        !lowerValue ||
        item.phonenumber?.toLowerCase().indexOf(lowerValue) !== -1 ||
        item.firstname?.toLowerCase().indexOf(lowerValue) !== -1
    );
  }

  // Filter by Date
  FilterByOrderDate() {
    let dateObj = formatDate(this.datefilter, 'dd/MM/yyyy', 'en-US');
    if (this.datefilter != null) {
      this.filteredList = this.orders.filter(
        (item) =>
          item.orderDate.toString().toLowerCase().indexOf(dateObj) !== -1
      );
    } else {
      this.filteredList = this.orders;
    }
  }

  public screenCapture() {
    console.log(this.things);
    var data = document.getElementById('tableCont');
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }
}
