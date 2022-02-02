import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Clients } from 'src/app/entities/ClientsModel';

@Component({
  selector: 'app-invoice-template',
  templateUrl: './invoice-template.component.html',
  styleUrls: ['./invoice-template.component.scss'],
})
export class InvoiceTemplateComponent implements OnInit {
  employeeId: any;
  bill: any;
  orderid: any;
  orderdata: any;
  currentdate: any;
  owntemplate = false;
  CompanyName = 'Suraj Xerox';
  customer: any
  NoPrint = true;

  //constants
  tableHeaders = [
    'S.No.', 'Products', 'Materials', 'Size','Qty', 'Per Price', 'Total'
    ];

  @ViewChild('table', { static: true }) table: ElementRef;


  constructor(private service: CommonService, private route: ActivatedRoute, private router: Router) {
    this.orderid = this.route.snapshot.paramMap.get('id');
    this.employeeId = localStorage.getItem('UserId').toString();
  }

  ngOnInit(): void {

    this.GetBill(this.orderid);
    this.orderdata = this.service.downloadOrder;
    this.GetCustomerData();
    console.log(this.orderdata);
    this.currentdate = new Date().toLocaleDateString();
  }

  Download() {
    var data = document.getElementById('downloadBody');
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 210 ;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
     // var imgHeight = canvas.height;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(`Order_${this.orderid}.pdf`); // Generated PDF
    });
  }

  GetBill(orderId) {
    let post = {};
    post['oauth'] = this.service.Oauth;
   // post['eid'] = this.employeeId;
    post['orderid'] = orderId.toString();
    this.service.GetBillByOrderId(post).subscribe((res) => {
      if (res.returncode == 200) {
        console.log(res);
        this.bill = res;
        this.bill.orderid = this.bill.products[0].orderid;
        this.bill['DueAmount'] = Number(this.bill.totalamount??'0') - Number(this.bill.paidamount??'0');
      }
    });
  }

  CancelView(){
    this.router.navigateByUrl("Home/Sales/ManageInvoice")
  }

  GetCustomerData(){
    this.customer = this.service.Allcustomers.find(x=> x.BillingPhone == this.orderdata.phonenumber);
    // if(!this.customer){
    //   this.customer =new Clients();
    // }
    // console.log(this.customer);
  }
}
