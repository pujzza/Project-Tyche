import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Clients } from 'src/app/entities/ClientsModel';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss'],
})
export class ManageClientsComponent implements OnInit {
  rows = [
    { sno: 1, name: 'John Doe', email: 'jd@master.com', phoneno: 345723947 },
  ];
  loadingIndicator = true;
  reorderable = true;
  data = [];
  clientData: Clients[];

  columns = [
    { prop: 'id', name: 'Client ID',width: 50 },
    { prop: 'OrgName', name: 'Client Name',width: 100 },
    { prop: 'BillingEmail', name: 'Email Id',width: 100 },
    { prop: 'BillingPhone', name: 'Contact No.',width: 70 },
    { name: 'Settings',width: 100 },
  ];

  ColumnMode = ColumnMode;
  constructor(public service: CommonService) {}

  ngOnInit(): void {
    document.getElementById('ngxtable').style.height = `${
      screen.height - 170
    }px`;
    this.getAllClients();
  }

  getAllClients() {
    this.service.GetAllClients('').subscribe((res) => {
      if (res && res.returncode == 200) {
        this.clientData = res.returndata;
      }
    });
  }
}
