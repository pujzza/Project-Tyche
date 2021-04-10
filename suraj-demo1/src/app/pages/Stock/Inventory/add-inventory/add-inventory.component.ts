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
  constructor() { }

  ngOnInit(): void {
  }

  AddItem(){
    console.log(this.item);
  }

}
