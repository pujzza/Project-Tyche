import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { BillModel, CustomerDetails } from '../entities/ClientsModel';
import { loginModel } from '../entities/LoginModel';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  // Do not edit this Oauth
  Oauth = 'RVn06PJIj36gt40zSAmLwAD742f';
  screenHeight;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.screenHeight = window.screen.availHeight;
  }

  ToLogin(req: loginModel): Observable<any> {
    return this.http.post('http://www.cyperinfotech.com/api/login.php', req);
  }

  CustomerValidate(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Customer/validate_customers.php',
      req
    );
  }

  CreateCustomer(req: CustomerDetails): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Customer/create_customers.php',
      req
    );
  }

  CreateBill(req: BillModel): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Product/create.php',
      req
    );
  }

  GetBills(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Product/read_filter.php',
      req
    );
  }
  GetOrders(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Product/read_employ_order.php',
      req
    );
  }
  GetBillByOrderId(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Product/read_products.php',
      req
    );
  }
  updateAmount(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Product/products_update.php',
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
      'http://cyperinfotech.com/api/apiV2/Client/CreateClient.php',
      req
    );
  }

  UpdateClient(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Client/updateclient.php',
      req
    );
  }

  GetAllClients(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Client/getclient.php',
      req
    );
  }

  AddProduct(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Stock/CreateProductNew.php',
      req
    );
  }

  GetAllProducts(): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Stock/GetProducts.php',
      ''
    );
  }

  GetInventory(): Observable<any> {
    return this.http.get(
      'http://cyperinfotech.com/api/apiV2/Inventory/GetItem.php'
    );
  }

  CreateInventory(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Inventory/CreateInventory.php',
      req
    );
  }

  UpdateInventory(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Inventory/UpdateInventory.php',
      req
    );
  }

  InventoryDropItem(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Inventory/DropItems.php',
      req
    );
  }

  DeleteClientById(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Client/DeleteClient.php',
      req
    );
  }
  DeleteInventory(req: any): Observable<any> {
    return this.http.post(
      'http://cyperinfotech.com/api/apiV2/Inventory/DeleteInventoryItem.php',
      req
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
