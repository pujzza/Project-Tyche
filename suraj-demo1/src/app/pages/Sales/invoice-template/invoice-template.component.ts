import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
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

  constructor(private service: CommonService, private route: ActivatedRoute) {
    this.orderid = this.route.snapshot.paramMap.get('id');
    this.employeeId = localStorage.getItem('UserId').toString();
  }

  ngOnInit(): void {
    this.GetBill(this.orderid);
    this.orderdata = this.service.downloadOrder;
    this.currentdate = new Date().toLocaleDateString();
  }

  Download() {
    var data = document.getElementById('downloadBody');
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

  GetBill(orderId) {
    let post = {};
    post['oauth'] = this.service.Oauth;
    post['eid'] = this.employeeId;
    post['orderid'] = orderId.toString();
    this.service.GetBillByOrderId(post).subscribe((res) => {
      if (res.returncode == 200) {
        console.log(res);
        this.bill = res;
        this.bill.orderid = this.bill.products[0].orderid;
      }
    });
  }
}
