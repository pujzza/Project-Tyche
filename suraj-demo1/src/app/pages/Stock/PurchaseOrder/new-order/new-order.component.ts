import { Orders } from './../../../../entities/BillHistoryModel';
import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { Item, PurchaseOrder } from 'src/app/entities/StockModels';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  constructor(private servie: CommonService) {}
  statusData = ['Order', 'Return', 'Cancel'];
  itemData = [new Item()];
  rawmaterials = [];
  porder = new PurchaseOrder();

  ngOnInit(): void {
    this.getItems();
    console.log(this.itemData);
  }

  add() {
    const newI = new Item();
    this.itemData.push(newI);
    this.calculateTotal();
  }

  remove(index) {
    this.itemData.splice(index, 1);
    this.calculateTotal();
  }

  getItems() {
    this.servie.GetInventory().subscribe((res) => {
      if (res && res.returncode == 200) {
        this.rawmaterials = res.returndata;
      }
    });
  }

  save(item) {
    item.isSave = true;
    item.isEdit = false;
    this.calculateTotal();
  }

  edit(item) {
    item.isEdit = true;
    item.isSave = false;
  }

  getAmount(item: Item) {
    item.Amount = (
      Number(item.Price ?? '0') * Number(item.BundleCount ?? '0')
    ).toString();
    return item.Amount;
  }

  assignId(id, item) {
    item.ItemName = this.rawmaterials.find((x) => x.ItemId == id)?.ItemName;
  }

  calculateTotal() {
    let amt = 0;
    this.itemData.forEach((x) => {
      if(x.ItemStatus == "Order"){
      amt = amt + Number(x.Amount ?? '0') ;
      }
    });
    this.porder.TotalAmount = amt.toString();
  }

  confirmOrder(): any{
    let finalList;
    finalList = this.itemData.filter(
      x => (x.isSave && !x.isEdit)
    )
    return finalList;
  }

  generateOrder(){
    this.itemData = this.confirmOrder();
    this.porder.oauth = this.servie.Oauth;
  }
}
