import { CommonService } from 'src/app/services/common.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DeleteItemModel } from 'src/app/entities/HomeModel';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss'],
})
export class ManageOrderComponent implements OnInit, AfterViewInit {
  //Meta
  ColumnMode = ColumnMode;

  //Boolean Variables
  loadingIndicator = true;
  reorderable = true;
  isShowBill = false;
  isLoading = true;

  //Any Variable
  bill: any;
  searchOrder: any;

  //Array Variables
  filteredList = [];
  rows = [];
  data = [];
  columns = [
    { prop: 'sno', name: 'Sno.' },
    { prop: 'OrderID', name: 'Order #' },
    { prop: 'SupplierName', name: 'Supplier Name' },
    { prop: 'OrderDueDate', name: 'Order Duedate' },
    { prop: 'Amount', name: 'Total Amount' },
    { name: 'Settings' },
  ];

  //Viewchilds/ DOM ELements
  @ViewChild('table', { static: true }) table: ElementRef;
  @ViewChild('showBill', { static: false }) showBill: ElementRef;

  constructor(private service: CommonService) {}

  ngOnInit(): void {
   // this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
    this.GetPurchaseOrder();
  }
  ngAfterViewInit(): void {
   // this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
  }

  //Search
  SearchOrder() {
    const lowerValue = this.searchOrder.toLowerCase();
    this.filteredList = this.data.filter(
      (item) =>
        item.OrderID.toString().toLowerCase().indexOf(lowerValue) !== -1 ||
        !lowerValue ||
        item.SupplierName.toLowerCase().indexOf(lowerValue) !== -1
    );
  }

  //API- GET Orders
  GetPurchaseOrder() {
    this.service.GetPurchaseOrders().subscribe((res) => {
      this.data = res['returndata'];
      this.filteredList = this.data;
      this.isLoading = false;
    }, err => {this.isLoading = false;});
  }

  //View Bill
  viewbill(item) {
    this.bill = item;
    this.isShowBill = true;
  }

  //Delete Item
  DeleteItem(item) {
    let postparam = new DeleteItemModel();
    postparam.oauth = this.service.Oauth;
    postparam.Table = 'PurchaseOrder';
    postparam.ID = item.OrderID;
    this.service.DeleteItem(postparam).subscribe(
      (res) => {
        if (res && res.returncode == 200) {
          this.service.OpenSnackBar('Delete Successfull', 'SUCCESS');
          this.GetPurchaseOrder();
        } else {
          this.service.OpenSnackBar(res.returnmessage, 'ERROR');
        }
      },
      (err) => {
        this.service.OpenSnackBar('Something went wrong', 'SORRY');
      }
    );
  }
}
