import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { formatDate } from '@angular/common';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { payAmt } from 'src/app/entities/BillHistoryModel';

@Component({
  selector: 'app-invoice-queue',
  templateUrl: './invoice-queue.component.html',
  styleUrls: ['./invoice-queue.component.scss'],
})
export class InvoiceQueueComponent implements OnInit {
  employeeId: string;
  isloading: boolean = false;
  filteredList: any;
  orders: any;
  isShowBill = false;
  ispayAmt = false;
  ColumnMode = ColumnMode;

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
  payAmtReq = new payAmt;
  TotalAmt: any;
  DueAmt: any;
  bill: any;
  errorText: string;
  disablePay: boolean;

  constructor(public service: CommonService, private route: Router) {
    this.employeeId = localStorage.getItem('UserId').toString();
  }

  ngOnInit(): void {
    this.GetQueuedInvoices();
  }

  // Depreciated
  GetOrders() {
    const billreq = {
      oauth: this.service.Oauth,
      eid: this.employeeId,
    };
    this.service.GetOrders(billreq).subscribe(
      (res) => {
        if (res.returncode === 200) {
          const data = res.orders.filter((x) => x['paidamount'] == 0 && x['totalamount'] != 0);
          data.forEach((ele) => {
            ele.orderDate = formatDate(ele.orderDate, 'dd/MM/yyyy', 'en-US');
          });
          this.orders = data;
          this.filteredList = data;
          this.orders.map((r) => {
            r.dueAmt = Number(r.totalamount) - Number(r.paidamount);
          });
          this.isloading = false;
        }
      },
      (err) => {
        this.isloading = false;
        this.service.OpenSnackBar('ERROR', 'Something went wrong!');
      }
    );
  }

  GetQueuedInvoices() {
    
    this.service.GetQueueInvoice().subscribe(
      (res) => {
        if (res.returncode === 200) {
          this.orders = res.orders;
          this.filteredList = res.orders;
          // this.orders.map((r) => {
          //   r.dueAmt = Number(r.totalamount) - Number(r.paidamount);
          // });
          this.isloading = false;
        }
      },
      (err) => {
        this.isloading = false;
        this.service.OpenSnackBar('ERROR', 'Something went wrong!');
      }
    );
  }

    // To get the Due Value
    getDue(row) {
      if (row) return Number(row['totalamount']) - Number(row['paidamount']);
      else return 0;
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

  // Open Payment model box
  openPayAmt(row) {
    this.ispayAmt = true;
    this.GetBill(row.orderid);
    this.payAmtReq.oauth = this.service.Oauth;
    this.payAmtReq.orderid = row.orderid;
    this.TotalAmt = row.totalamount;
    this.DueAmt = row.dueAmt;
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
       // this.isShowBill = true;
      } else {
        //this.isShowBill = false;
      }
    });
  }
  
}
