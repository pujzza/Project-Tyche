import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { InventoryItem } from 'src/app/entities/StockModels';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {
  warehouses = ['Chennai', 'Amritsar','Mumbai', 'Kolkata','Delhi', 'Banglore', 'Hyderabad'];
  item = new InventoryItem();
  constructor(private service: CommonService) { }

  ngOnInit(): void {
  }

  AddItem(){
    this.item.oauth = this.service.Oauth;
    // this.service.CreateInventory(this.item).subscribe(
    //   res => {
    //     if(res && res.returncode == 200){
    //       this.service.OpenSnackBar('Inventory Created!','SUCCESS');
    //       this.item = new InventoryItem();
    //     }
    //     else{
    //       this.service.OpenSnackBar('Inventory Not Created!','FAILED');
    //     }
    //   },
    //   (error) => {
    //     this.service.OpenSnackBar('Something went wrong','SORRY');
    //   }
    // );
    this.service.OpenSnackBar('Inventory Created!','SUCCESS');
  }

}
