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
    GetNotify(url:String) {
      return this.http.get(
        'http://cyperinfotech.com/api/notificationapiv2.php?list='+url,
      );
    }
    PrintBill(employeeId,currentOrderId){
      window.open('http://www.cyperinfotech.com/pdf/pdf.php?eid='+employeeId+'&order_id='+currentOrderId+'&papersize=bill&m=I');
    }
    DownloadBill(eid,orderid){
      window.open('http://www.cyperinfotech.com/pdf/pdf.php?eid='+eid+'&order_id='+orderid+'&papersize=a4&m=D');
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
}
