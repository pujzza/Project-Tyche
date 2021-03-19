import { CommonService } from './../../../services/common.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MetaProducts } from 'src/app/entities/MetaProducts';
import { BillModel, CustomerDetails,Products } from 'src/app/Entities/ClientsModel';

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
  searchMobile: number;
  customerDetails: CustomerDetails = new CustomerDetails();
  isCheckout = false;
  checkoutError = false;
  checkOutErrorMsg = '';
  employeeId: any;
  isProductsError = false;
  isMaterialError = false;
  isSizeError = false;
  currentOrderId: any;
  @ViewChild('addClient', { static: true }) addclient: ElementRef;
  @ViewChild('checkoutDialog', { static: true }) checkoutDialog: ElementRef;


  constructor(public service: CommonService) {
    this.employeeId = localStorage.getItem('UserId').toString();
  }
  ngAfterViewInit(): void {}

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
    this.qty = this.qty == 0 ? 1 : this.qty;
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
    this.qty = this.qty == 0 ? 1 : this.qty;
    this.isSizeError = false;
    this.calcPrice(-2);
  }

  onSelectMatrial() {
    const length = this.prodtableData.length;
    this.qty = this.qty == 0 ? 1 : this.qty;
    this.isMaterialError = false;
    this.calcPrice(-2);
  }

  calcPrice(index = -2) {
    const length = this.prodtableData.length;
    if (index == -2) {
      this.cost = this.selectProduct.price * this.qty;
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
    if (this.TaxNeed) {
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

  addItem() {
    this.isMaterialError = this.selectedMaterial == '' ? true : false;
    this.isSizeError = this.selectedSize == '' ? true : false;
    if (this.isSizeError || this.isMaterialError) {
      return;
    } else {
      const obj = {};
      obj['prodname'] = this.selectProduct.name;
      obj['prodmaterial'] = this.selectedMaterial;
      obj['prodsize'] = this.selectedSize;
      obj['prodqty'] = this.qty;
      obj['prodprice'] = this.cost;
      obj['qtydisabled'] = true;
      obj['orderid'] = `${new Date().getHours()}${new Date().getMilliseconds()}`;
      this.prodtableData.push(obj);
      this.resetSelectedVales();
      this.qty = 0;
    }
  }

  getCustomer() {
    let postParamter = {};
    postParamter['oauth'] = this.service.Oauth;
    postParamter['phonenumber'] = this.searchMobile;
    this.service.CustomerValidate(postParamter).subscribe((res) => {
      if (res && res.returncode == 200) {
        this.clientSelected = true;
        this.customerDetails = res.returndata;
      } else {
        this.clientSelected = false;
      }
    });
  }

  generateInvoice() {
    if(this.prodtableData.length == 0){
      this.checkoutError = true;
      this.checkOutErrorMsg = 'No Product Seleted';
      this.isCheckout = true;
      return;
    } else if (!this.customerDetails.id){
      this.checkoutError = true;
      this.checkOutErrorMsg = 'No Customer Seleted';
      this.isCheckout = true;
      return;
    }
    else {
    this.checkoutError = false;
    let postParameter = new BillModel();
    postParameter.cid = this.customerDetails.id.toString();
    postParameter.eid = this.employeeId;
    postParameter.oauth = this.service.Oauth;
    postParameter.orderid = `${new Date().getHours()}${new Date().getMilliseconds()}`;
    postParameter.products = this.convertClass(this.prodtableData);
    postParameter.totalamount = this.grandTotal.toString();
    postParameter.paidamount = '0';
    this.service.CreateBill(postParameter).subscribe(res => {
      if(res && res.returncode == 200){
        this.currentOrderId = postParameter.orderid;
        this.isCheckout = true;
        this.checkoutError = false;
        this.service.GetNotify(postParameter.products.length.toString()).subscribe();
      }
    });
  }
  }

  convertClass(data): any {
    var postbody: Products[] = [];
    data.forEach((obj) => {
      var prod = new Products();
      prod.product = obj['prodname'];
      prod.material = obj['prodmaterial'];
      prod.size = obj['prodsize'];
      prod.count = obj['prodqty'];
      prod.totalamount = obj['prodprice'];
      prod.paidamount = '0';
      prod.orderid = obj['orderid'];
      prod.price = this.MetaProducts.filter( p => p.name == prod.product)[0].price.toString();
      prod.category_id = '2';
      prod.description = 'testing';
      prod.created = `${new Date().toDateString()}`;
      prod.cid = this.customerDetails.id.toString();
      postbody.push(prod);
    });
    return postbody;
  }

  printGenerate(){
    this.isCheckout = false;
    window.open('http://funguysstudio.com/pdf/pdf.php?eid='+this.employeeId+'&order_id='+this.currentOrderId+'&papersize=bill&m=I');
  }

  closeCheckout(){
    this.isCheckout = false;
    if(this.checkoutError == false){
    this.prodtableData = [];
    this.searchMobile = null;
    this.clientSelected = false;
    this.customerDetails = new CustomerDetails();
    }
  }
}
