import { UpdateEmployeeReq } from './../entities/EmployeeModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { BillModel, CustomerDetails } from '../entities/ClientsModel';
import { loginModel } from '../entities/LoginModel';
export const Oauth = 'RVn06PJIj36gt40zSAmLwAD742f';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  // Do not edit this Oauth
  Oauth = Oauth;
  isLoggedIn = false;
  screenH;
  downloadOrder:any;
  userRole = 2; // Employee

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.screenH = window.screen.height - 100;
  }

  isEmployee(){
    return (this.userRole == 2 ? 0 : 1);
  }

  ToLogin(req: loginModel): Observable<any> {
    return this.http.post(
      'http://www.cyperinfotech.com/cyperinfotech/login.php',
      req
    );
  }

  ToLoginEmployee(req: loginModel): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Employee/EmployeeLogin.php',
      req
    );
  }

  CustomerValidate(req: any): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Customer/validate_customers.php',
      req
    );
  }

  CreateCustomer(req: CustomerDetails): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Customer/create_customers.php',
      req
    );
  }

  CreateBill(req: BillModel): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Product/create.php',
      req
    );
  }

  GetBills(req: any): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Product/read_filter.php',
      req
    );
  }
  GetOrders(req: any): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Product/read_employ_order.php',
      req
    );
  }
  GetBillByOrderId(req: any): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Product/read_products.php',
      req
    );
  }
  updateAmount(req: any): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Product/products_update.php',
      req
    );
  }
  GetNotify(url: String) {
    return this.http.get(
      'http://cyperinfotech.com/api/notificationapiv2.php?list=' + url
    );
  }
  PrintBill(employeeId, currentOrderId) {
    window.open(
      'http://www.cyperinfotech.com/pdf/pdf.php?eid=' +
        employeeId +
        '&order_id=' +
        currentOrderId +
        '&papersize=bill&m=I'
    );
  }
  DownloadBill(eid, orderid) {
    window.open(
      'http://www.cyperinfotech.com/pdf/pdf.php?eid=' +
        eid +
        '&order_id=' +
        orderid +
        '&papersize=a4&m=D'
    );
  }

  CreateClient(req: any): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Client/CreateClient.php',
      req
    );
  }

  UpdateClient(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/cyperinfotech/api/Client/updateclient.php',
      req
    );
  }

  GetAllClients(req: any): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Client/getclient.php',
      req
    );
  }

  AddProduct(req: any): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Stock/CreateProductNew.php',
      req
    );
  }

  GetAllProducts(): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Stock/GetProducts.php',
      ''
    );
  }

  GetInventory(): Observable<any> {
    return this.http.get('http://api.cyperinfotech.com/Inventory/GetItem.php');
  }

  CreateInventory(req: any): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Inventory/CreateInventory.php',
      req
    );
  }

  UpdateInventory(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/cyperinfotech/api/Inventory/UpdateInventory.php',
      req
    );
  }

  InventoryDropItem(req: any): Observable<any> {
    return this.http.post(
      'http://api.cyperinfotech.com/Inventory/DropItems.php',
      req
    );
  }

  DeleteItem(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/cyperinfotech/api/Delete.php',
      req
    );
  }

  GetAllEmployees(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/cyperinfotech/api/Employee/GetEmployeeDetails.php',
      req
    );
  }
  CreateEmployee(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/cyperinfotech/api/Employee/CreateEmployeeCred.php',
      req
    );
  }

  GetPurchaseOrders(): Observable<any> {
    return this.http.get(
      'http://cyperinfotech.com/cyperinfotech/api/Purchase/GetOrderDetails.php'
    );
  }

  AddPurchaseOrder(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/cyperinfotech/api/Purchase/CreateOrder.php',
      req
    );
  }

  GetWareHouse(): Observable<any> {
    return this.http.get(
      'http://cyperinfotech.com/cyperinfotech/api/Warehouse/GetWarehouseDetails.php'
    );
  }

  AddWarehouse(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/cyperinfotech/api/Warehouse/AddWarehouse.php',
      req
    );
  }

  UpdateWarehouse(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/cyperinfotech/api/Warehouse/UpdateWarehouse.php',
      req
    );
  }

  UpdateEmployee(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/cyperinfotech/api/Employee/updateEmployee.php',
      req
    );
  }

  GetQueueInvoice(): Observable<any> {
    return this.http.get(
      'http://cyperinfotech.com/cyperinfotech/api/Product/read_inqueue_order.php'
    );
  }

  OpenSnackBar(title, content) {
    this._snackBar.open(title, content, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
