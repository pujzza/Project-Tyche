import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetails, BillModel } from '../Entities/ClientsModel';
import { loginModel } from '../entities/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

    // Do not edit this Oauth
    Oauth = 'RVn06PJIj36gt40zSAmLwAD742f';

    constructor(private http: HttpClient) {}
  
    ToLogin(req: loginModel): Observable<any> {
      return this.http.post('http://www.funguysstudio.com/api/login.php', req);
    }
  
    CustomerValidate(req: any): Observable<any> {
      return this.http.post(
        'http://www.funguysstudio.com/api/validate_customers.php',
        req
      );
    }
  
    CreateCustomer(req: CustomerDetails): Observable<any> {
      return this.http.post(
        'http://www.funguysstudio.com/api/create_customers.php',
        req
      );
    }
  
    CreateBill(req: BillModel): Observable<any> {
      return this.http.post(
        'http://www.funguysstudio.com/api/product/create.php',
        req
      );
    }
  
    GetBills(req: any): Observable<any> {
      return this.http.post(
        'http://www.funguysstudio.com/api/product/read_filter.php',
        req
      );
    }
    GetOrders(req: any): Observable<any> {
      return this.http.post(
        'http://www.funguysstudio.com/api/product/read_order.php',
        req
      );
    }
    GetBillByOrderId(req: any): Observable<any> {
      return this.http.post(
        'http://www.funguysstudio.com/api/product/read_products.php',
        req
      );
    }
    updateAmount(req: any): Observable<any> {
      return this.http.post(
        'http://funguysstudio.com/api/product/products_update.php',
        req
      );
    }
    GetNotify(url:String) {
      return this.http.get(
        'http://funguysstudio.com/api/notificationapiv2.php?list='+url,
      );
    }
}
