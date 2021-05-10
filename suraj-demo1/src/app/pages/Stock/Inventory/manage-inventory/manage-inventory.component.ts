import { InventoryItem } from 'src/app/entities/StockModels';
import { Component, OnInit } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.component.html',
  styleUrls: ['./manage-inventory.component.scss']
})
export class ManageInventoryComponent implements OnInit {
data =[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  SortType = SortType;
  editQty = false;
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

  ngOnInit(): void {
    document.getElementById('ngxtable').style.height = `${screen.height - 170}px`;
    this.GetData();
  }

  GetData(){
    this.service.GetInventory().subscribe(
      res => {
        if(res && res.returncode == 200){
          this.data = res.returndata;
        }
      }
    );
  }

  UpdateInventory(){
    this.Item.oauth = this.service.Oauth;
    this.service.UpdateInventory(this.Item).subscribe(
      res => {
        if(res && res.returncode == 200){
          this.service.OpenSnackBar('Inventory Updated', 'SUCCESS');
          this.closeDialog();
          this.GetData();
        }
      },
      err => {
        this.service.OpenSnackBar('Something went wrong','SORRY');
      }
    )
  }

  closeDialog(){
    this.editQty = false;
    this.Item = new InventoryItem();
  }

  openDialog(item){
    this.editQty = true;
    this.Item = item;
  }

}
