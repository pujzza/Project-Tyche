import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MetaProducts } from 'src/app/entities/MetaProducts';

@Component({
  selector: 'app-new-sales-invoice',
  templateUrl: './new-sales-invoice.component.html',
  styleUrls: ['./new-sales-invoice.component.scss'],
})
export class NewSalesInvoiceComponent implements OnInit, AfterViewInit {
  MetaProducts = MetaProducts;
  grandTotal = 0;
  productTotal = 0;
  invoiceNumber: any;
  invoiceRef: any;
  invoiceDate: any;
  invoiceDueDate: any;
  selectProduct = MetaProducts[0];
  selectedMaterial: any = '';
  selectedSize: any = '';
  TaxNeed = false;
  selectedQty = 1;
  clientSelected = false;
  prodtableData = [];
  taxPercentage = 14;
  isaddClient = false;
  taxcost = 0;
  qty = 1;
  cost = 0;

  isProductsError = false;
  isMaterialError = false;
  isSizeError = false;
  @ViewChild('addClient', { static: true }) addclient: ElementRef;

  constructor() {}
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    //this.initalPush();
  }

  productSelection(product) {
    this.selectProduct = product;
    if (product.material.length == 1) {
      this.selectedMaterial = product.material[0];
    } else {
      this.selectedMaterial = '';
    }
    if (product.size.length == 1) {
      this.selectedSize = product.size[0];
    } else {
      this.selectedSize = '';
    }
    this.qty = this.qty ==0 ? 1: this.qty;
    this.calcPrice(-2);
  }

  AddProduct(obj) {
    const length = this.prodtableData.length;
    this.prodtableData[length - 1]['qtydisabled'] = true;
    this.resetSelectedVales();
    this.initalPush();
    console.log(this.prodtableData[length - 1]);
  }

  resetSelectedVales() {
    this.selectProduct = MetaProducts[0];
    this.selectedQty = 1;
    this.selectedMaterial = '';
    this.selectedSize = '';
  }

  initalPush() {
    const obj = {};
    obj['prodname'] = this.selectProduct.name;
    obj['prodmaterial'] = this.selectedMaterial;
    obj['prodsize'] = this.selectedSize;
    obj['prodqty'] = this.selectedQty;
    obj['prodprice'] = this.selectedQty * this.selectProduct.price;
    obj['qtydisabled'] = false;
    this.prodtableData.push(obj);
  }

  onSelectSize() {
    const length = this.prodtableData.length;
    this.qty = this.qty ==0 ? 1: this.qty;
    this.isSizeError = false;
    this.calcPrice(-2);
  }

  onSelectMatrial() {
    const length = this.prodtableData.length;
   this.qty = this.qty ==0 ? 1: this.qty;
   this.isMaterialError = false;
   this.calcPrice(-2);
  }

  calcPrice(index = -2) {
    const length = this.prodtableData.length;
    if (index == -2) {
     this.cost =
        this.selectProduct.price * this.qty;
    } else {
      const prodprice = this.MetaProducts.filter(
        (x) => x.name == this.prodtableData[index]['prodname']
      )[0].price;
      this.prodtableData[index]['prodprice'] =
        prodprice * this.prodtableData[index]['prodqty'];
    }
  }

  getTotal() {
    let total = 0;
    this.prodtableData.forEach((d) => {
      total += d['prodprice'] ?? 0;
    });
    this.productTotal = total;
    return total;
  }

  getGrandTotal() {
    let taxcost = 0;
    if(this.TaxNeed){
      taxcost = (this.taxPercentage * this.productTotal) / 100;
      this.taxcost = taxcost;
    } else {
      taxcost = this.taxcost = 0;
    }
    this.grandTotal = this.productTotal + taxcost;
    return this.grandTotal;
  }

  deleteProduct(index) {
    this.prodtableData.splice(index, 1);
  }
  EditQty(index) {
    this.prodtableData[index]['qtydisabled'] = false;
  }

  saveQty(index) {
    this.prodtableData[index]['qtydisabled'] = true;
  }

  addItem(){
    this.isMaterialError = this.selectedMaterial == ''? true : false;
      this.isSizeError = this.selectedSize == ''? true : false;
      if(this.isSizeError || this.isMaterialError ){
      return;
    } else {
      const obj = {};
      obj['prodname'] = this.selectProduct.name;
      obj['prodmaterial'] = this.selectedMaterial;
      obj['prodsize'] = this.selectedSize;
      obj['prodqty'] = this.qty;
      obj['prodprice'] = this.cost;
      obj['qtydisabled'] = true;
      this.prodtableData.push(obj);
      this.resetSelectedVales();
      this.qty =0;
    }
    
  }
}
