import { InventoryItem } from 'src/app/entities/StockModels';
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { CommonService } from 'src/app/services/common.service';
import { DeleteItemModel } from 'src/app/entities/HomeModel';

@Component({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.component.html',
  styleUrls: ['./manage-inventory.component.scss'],
})
export class ManageInventoryComponent implements OnInit, AfterViewInit {
  data = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  SortType = SortType;
  editQty = false;
  filteredList = [];
  isLoading = true;
  searchInventory: any;
  @ViewChild('table', { static: false }) table: ElementRef;

  columns = [
    { prop: 'ItemId', name: '#', width: 10 },
    { prop: 'ItemName', name: 'Item Name', width: 100 },
    { prop: 'Category', name: 'Category', width: 70 },
    { prop: 'TotalCount', name: 'Total Count', width: 50 },
    { prop: 'Bundles', name: 'Bundle Count', width: 50 },
    { prop: 'ItemPerBundle', name: 'Per Bundle', width: 50 },
    { name: 'Settings', width: 100 },
  ];
  Item = new InventoryItem();
  constructor(public service: CommonService) {}
  ngAfterViewInit(): void {
    this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
  }

  ngOnInit(): void {
    if (this.table) {
      this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
    }
    this.GetData();
  }

  GetData() {
    this.service.GetInventory().subscribe((res) => {
      if (res && res.returncode == 200) {
        this.data = res.returndata;
        this.filteredList = res.returndata;
        this.isLoading = false;
      }
    },(err) => {this.isLoading = false;
      this.service.OpenSnackBar('ERROR','Something went wrong!')
      });
  }

  UpdateInventory() {
    this.Item.oauth = this.service.Oauth;
    this.service.UpdateInventory(this.Item).subscribe(
      (res) => {
        if (res && res.returncode == 200) {
          this.service.OpenSnackBar('Inventory Updated', 'SUCCESS');
          this.closeDialog();
          this.GetData();
        }
      },
      (err) => {
        this.service.OpenSnackBar('Something went wrong', 'SORRY');
      }
    );
  }

  closeDialog() {
    this.editQty = false;
    this.Item = new InventoryItem();
  }

  openDialog(item) {
    this.editQty = true;
    this.Item = item;
  }

  DeleteInventory(item) {
    let postparam = new DeleteItemModel();
    postparam.oauth = this.service.Oauth;
    postparam.Table = 'Inventory';
    postparam.ID = item.ItemId;
    this.service.DeleteItem(postparam).subscribe(
      (res) => {
        if (res && res.returncode == 200) {
          this.service.OpenSnackBar('Delete Successfull', 'SUCCESS');
          this.GetData();
        } else {
          this.service.OpenSnackBar(res.returnmessage, 'ERROR');
        }
      },
      (err) => {
        this.service.OpenSnackBar('Something went wrong', 'SORRY');
      }
    );
  }

  SearchInventory() {
    const lowerValue = this.searchInventory.toLowerCase();
    this.filteredList = this.data.filter(
      (item) =>
        item.ItemId.toString().toLowerCase().indexOf(lowerValue) !== -1 ||
        !lowerValue ||
        item.ItemName.toLowerCase().indexOf(lowerValue) !== -1 ||
        item.Category.toLowerCase().indexOf(lowerValue) !== -1
    );
  }
}
