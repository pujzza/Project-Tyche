import { CommonService } from './../../../services/common.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MetaProducts } from 'src/app/entities/MetaProducts';
import { BillModel, CustomerDetails,Products } from 'src/app/entities/ClientsModel';
import { SubProducts } from 'src/app/entities/StockModels';

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
  selectProduct :any;
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
  paidAmt: number;
  isClient = false;
  isNewCustomer = false;
  createCustomerError: boolean = false;
  newCustomer: CustomerDetails = new CustomerDetails();
  NC_phonenumber;
  NC_firstname;
  NC_lastname;
  NC_email;
  products :SubProducts[] = [];
  ProdCategory :any[] = [];
  ProdMaterial :any[] = [];
  ProdSize :any[] = [];
  @ViewChild('addClient', { static: true }) addclient: ElementRef;
  @ViewChild('checkoutDialog', { static: true }) checkoutDialog: ElementRef;
  


  constructor(public service: CommonService) {
    this.employeeId = localStorage.getItem('UserId').toString();
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    //this.initalPush();
    this.service.GetAllProducts().subscribe(
      res => {
        if(res){
          this.products = res.returndata;
          this.ProdCategory = Array.from(new Set(res.returndata.map((item) => item.ProductCategory.toLowerCase())));
        }
      }
    );
  }

  productSelection(product) {
    this.selectProduct = product;
    this.selectedMaterial = null;
    this.selectedSize = null;
    this.ProdMaterial = [];
    let material = this.products.filter(item => item.ProductCategory.toLowerCase().includes(this.selectProduct.toLowerCase()));
    if(material){
      this.ProdMaterial = Array.from(new Set(material.map((item) => item.ProductMaterial.toLowerCase())));
      if(this.ProdMaterial){
        let size = this.products.filter(item => (item.ProductCategory.toLowerCase().includes(this.selectProduct.toLowerCase())));
        if(size){
          this.ProdSize = Array.from(new Set(size.map((item) => item.ProductSize.toLowerCase())));
          if(this.ProdSize && this.ProdSize.length == 1){
            this.selectedSize = this.ProdSize[0];
          }
        }
      }
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
    obj['prodname'] = this.selectProduct;
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
    let size = this.products.filter(item => (item.ProductCategory.toLowerCase().includes(this.selectProduct.toLowerCase()) && item.ProductMaterial.toLowerCase().includes(this.selectedMaterial.toLowerCase())));
        if(size){
          this.ProdSize = Array.from(new Set(size.map((item) => item.ProductSize.toLowerCase())));
          if(this.ProdSize && this.ProdSize.length == 1){
            this.selectedSize = this.ProdSize[0];
          }
        }
    this.qty = this.qty == 0 ? 1 : this.qty;
    this.isMaterialError = false;
    this.calcPrice(-2);
  }

  calcPrice(index = -2) {
    const length = this.prodtableData.length;
    if (index == -2) {
      this.cost = 0;
      let cost = this.filerProduct(this.selectProduct,this.selectedMaterial,this.selectedSize); 
      if(cost){
        this.cost = Number(cost[0].ProductPrice) * this.qty;
      }
    } else {
      let prod = this.prodtableData[index];
      let cost = this.filerProduct(prod['prodname'],prod['prodmaterial'],prod['prodsize']); 
      if(cost){
        this.prodtableData[index]['prodprice'] =
        Number(cost[0].ProductPrice) * this.prodtableData[index]['prodqty'];
      }
      
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
    this.isMaterialError = this.selectedMaterial == '' || !this.selectedMaterial? true : false;
    this.isSizeError = this.selectedSize == '' || !this.selectedSize ? true : false;
    if (this.isSizeError || this.isMaterialError) {
      return;
    } else {
      const obj = {};
      obj['prodname'] = this.selectProduct;
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
        this.NC_phonenumber = this.searchMobile.toString();
        this.clientSelected = false;
        this.isNewCustomer = true;
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
    postParameter.paidamount = this.paidAmt.toString();
    this.service.CreateBill(postParameter).subscribe(res => {
      if(res && res.returncode == 200){
        this.reduceMaterials();
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
      prod.paidamount = this.paidAmt.toString();
      prod.orderid = obj['orderid'];
      prod.price = (Number(obj['prodprice'])/Number(obj['prodqty'])).toString();
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
    this.checkoutReset();
    this.service.PrintBill(this.employeeId,this.currentOrderId);
  }

  closeCheckout(){
    this.isCheckout = false;
    this.checkoutReset();
  }

  checkoutReset(){
    if(this.checkoutError == false){
      this.prodtableData = [];
      this.searchMobile = null;
      this.clientSelected = false;
      this.customerDetails = new CustomerDetails();
      this.newCustomer = new CustomerDetails();
      this.paidAmt = null;
      }
  }

  AddNewCustomer(){
    this.newCustomer.oauth = this.service.Oauth;
    this.newCustomer.phonenumber = this.NC_phonenumber;
    this.newCustomer.firstname = this.NC_firstname;
    this.newCustomer.lastname = this.NC_lastname;
    this.newCustomer.email = this.NC_email;
    this.service.CreateCustomer(this.newCustomer).subscribe(
      res => {
        if(res.returncode == 200){
          this.customerDetails = res.returndata;
          this.clientSelected = true;
          this.createCustomerError = false;
          this.checkOutErrorMsg = '';
          this.isNewCustomer = false;
        } else {
          this.createCustomerError = true;
          this.checkOutErrorMsg = res.returnmessage;
        }
      }
    );
  }

  closeCreateCustomer(){
    this.isNewCustomer = false;
    this.newCustomer = new CustomerDetails();
    this.createCustomerError = false;
    this.checkOutErrorMsg = '';
  }

  reduceMaterials(){
    this.prodtableData.forEach(
      item => {
        let prod = this.filerProduct(item['prodname'],item['prodmaterial'],item['prodsize']); 
        if(prod){
          let postparam = {};
          postparam['ItemId'] = prod[0].ProductRawMaterials.toString();
          postparam['Amount'] = item['prodqty'].toString();
          postparam['oauth'] = this.service.Oauth;
          this.service.InventoryDropItem(postparam).subscribe(res => {
            if(res && res.returncode == 200){
              console.log('Inventory Drop Successfull');
            }
          });
        }
      }
    )
  }

  filerProduct(prodname,prodmaterial,prodsize): any{
    var prod = this.products.filter(
      item => (
        item.ProductCategory.toLowerCase().includes(prodname.toLowerCase()) &&
        item.ProductMaterial.toLowerCase().includes(prodmaterial.toLowerCase()) &&
        item.ProductSize.toLowerCase().includes(prodsize.toLowerCase())
      )
    );

    return prod;
  }
}
