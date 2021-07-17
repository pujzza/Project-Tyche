import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { Item, PurchaseOrder } from 'src/app/entities/StockModels';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  constructor(private service: CommonService) {}
  statusData = ['Order', 'Return', 'Cancel'];
  itemData = [new Item()];
  rawmaterials = [];
  porder = new PurchaseOrder();
  errorText = '';
  isError = false;

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
    this.service.GetInventory().subscribe((res) => {
      if (res && res.returncode == 200) {
        this.rawmaterials = res.returndata;
      }
    });
  }

  save(item: Item) {
    if (
      !item.BundleCount ||
      item.BundleCount == '' ||
      !item.ItemName ||
      item.ItemName == '' ||
      !item.ItemStatus ||
      item.ItemStatus == '' ||
      !item.Price ||
      item.Price == ''
    ) {
      item.errorText = 'Fill all details';
    } else {
      item.errorText = '';
      item.isSave = true;
      item.isEdit = false;
      this.calculateTotal();
    }
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
      if (x.ItemStatus == 'Order') {
        amt = amt + Number(x.Amount ?? '0');
      }
    });
    this.porder.TotalAmount = amt.toString();
  }

  confirmOrder(): any {
    let finalList;
    finalList = this.itemData.filter((x) => x.isSave && !x.isEdit);
    return finalList;
  }

  generateOrder() {
    var postData = this.confirmOrder();
    this.porder.oauth = this.service.Oauth;
    this.porder.Items = postData;
    this.service.AddPurchaseOrder(this.porder).subscribe(
      (res) => {
        if (res && res.returncode == 200) {
          this.service.OpenSnackBar(res.returnmessage, 'Success');
          this.clearData();
        } else {
          this.service.OpenSnackBar(res.returnmessage, 'Error');
        }
      },
      (error) => {
        this.service.OpenSnackBar('Something went wrong !', 'Sorry');
      }
    );
    
  }

  validate() {
    if (
      !this.porder.SupplierContact ||
      this.porder.SupplierContact == '' ||
      !this.porder.SupplierName ||
      this.porder.SupplierName == ''
    ) {
      this.errorText = 'Enter Supplier Details';
      this.isError = true;
    } else if (this.itemData.filter((x) => !x.isSave && x.isEdit)?.length > 0) {
      this.errorText = 'Save all your data';
      this.isError = true;
    } else {
      this.errorText = '';
      this.isError = false;
      this.generateOrder();
    }
  }

  clearData() {
    this.porder = new PurchaseOrder();
    this.itemData = [new Item()];
  }
}
