import { InventoryItem } from 'src/app/entities/StockModels';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.component.html',
  styleUrls: ['./manage-inventory.component.scss']
})
export class ManageInventoryComponent implements OnInit,AfterViewInit {
data =[];
  loadingIndicator = true;
  @ViewChild('table', { static: true }) table: ElementRef;
  reorderable = true;
  ColumnMode = ColumnMode;
  SortType = SortType;
  editQty = false;
  filteredList = [];
  searchInventory:any
  columns = [
    { prop: 'ItemId', name: '#',width: 10 },
    { prop: 'ItemName', name: 'Item Name',width: 100 },
    { prop: 'Category', name: 'Category',width: 70 },
    { prop: 'Bundles', name: 'Bundle Count',width: 50 },
    { prop: 'ItemPerBundle', name: 'Per Bundle',width: 50 },
    { name: 'Settings',width: 100 },
  ];
  Item = new InventoryItem();
  constructor(public service: CommonService) {
  }
  ngAfterViewInit(): void {
    this.table.nativeElement.style.height = `${this.service.screenHeight}px`;
  }

  ngOnInit(): void {
    document.getElementById('ngxtable').style.height = `${this.service.screenHeight}px`;
    this.GetData();
  }

  GetData(){
    this.service.GetInventory().subscribe(
      res => {
        if(res && res.returncode == 200){
          this.data = res.returndata;
          this.filteredList = res.returndata;
        }
      }
    );
  }

  UpdateInventory(){
    this.Item.oauth = this.service.Oauth;
    // this.service.UpdateInventory(this.Item).subscribe(
    //   res => {
    //     if(res && res.returncode == 200){
    //       this.service.OpenSnackBar('Inventory Updated', 'SUCCESS');
    //       this.closeDialog();
    //       this.GetData();
    //     }
    //   },
    //   err => {
    //     this.service.OpenSnackBar('Something went wrong','SORRY');
    //   }
    // )
    this.service.OpenSnackBar('Inventory Updated', 'SUCCESS');
    this.closeDialog();
  }

  closeDialog(){
    this.editQty = false;
    this.Item = new InventoryItem();
  }

  openDialog(item){
    this.editQty = true;
    this.Item = item;
  }

  DeleteInventory(item){
    let postparam = {};
    postparam['ItemId'] = item['ItemId'];
    postparam['oauth'] = this.service.Oauth;
    // this.service.DeleteInventory(postparam).subscribe(
    //   res => {
    //     if(res && res.returncode == 200){
    //       this.service.OpenSnackBar('Delete Successfull','SUCCESS');
    //       this.GetData();
    //     } else {
    //       this.service.OpenSnackBar(res.returnmessage,'ERROR');
    //     }
    //   },
    //   err => {
    //     this.service.OpenSnackBar('Something went wrong','SORRY');
    //   }
    // );
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
