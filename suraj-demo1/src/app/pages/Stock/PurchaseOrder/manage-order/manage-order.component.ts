import { CommonService } from 'src/app/services/common.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DeleteItemModel } from 'src/app/entities/HomeModel';

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
  isShowBill = false;
  bill: any;
  @ViewChild('showBill', { static: false }) showBill: ElementRef;
  filteredList = [];

  columns = [
    { prop: 'sno', name: 'Sno.' },
    { prop: 'OrderID', name: 'Order #' },
    { prop: 'SupplierName', name: 'Supplier Name' },
    { prop: 'OrderDueDate', name: 'Order Duedate' },
    { prop: 'Amount', name: 'Total Amount' },
    { name: 'Settings' },
  ];

  ColumnMode = ColumnMode;
  searchOrder: any;
  constructor(private service: CommonService) {}

  ngOnInit(): void {
    this.GetPurchaseOrder();
  }

  SearhOrder() {
    const lowerValue = this.searchOrder.toLowerCase();
    this.filteredList = this.data.filter(
      (item) =>
        item.OrderID.toString().toLowerCase().indexOf(lowerValue) !== -1 ||
        !lowerValue ||
        item.SupplierName.toLowerCase().indexOf(lowerValue) !== -1
    );
  }

  GetPurchaseOrder() {
    this.service.GetPurchaseOrders().subscribe((res) => {
      this.data = res['returndata'];
      this.filteredList = this.data;
    });
  }

  viewbill(item) {
    this.bill = item;
    this.isShowBill = true;
  }

  DeleteItem(item){
    let postparam = new DeleteItemModel()
    postparam.oauth = this.service.Oauth;
    postparam.Table = "PurchaseOrder";
    postparam.ID = item.OrderID;
    this.service.DeleteItem(postparam).subscribe(
      res => {
        if(res && res.returncode == 200){
          this.service.OpenSnackBar('Delete Successfull','SUCCESS');
          this.GetPurchaseOrder();
        } else {
          this.service.OpenSnackBar(res.returnmessage,'ERROR');
        }
      },
      err => {
        this.service.OpenSnackBar('Something went wrong','SORRY');
      }
    )
  }
}
