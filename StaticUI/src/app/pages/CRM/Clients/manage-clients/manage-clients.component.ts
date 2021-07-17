import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Clients } from 'src/app/entities/ClientsModel';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss'],
})
export class ManageClientsComponent implements OnInit,AfterViewInit {
  rows = [
    { sno: 1, name: 'John Doe', email: 'jd@master.com', phoneno: 345723947 },
  ];
  
  loadingIndicator = true;
  reorderable = true;
  data = [];
  clientData: Clients[];
  isviewClient = false;
  viewClient = new Clients();
  filteredList= [];
  searchClient:any


  columns = [
    { prop: 'id', name: 'Client ID',width: 50 },
    { prop: 'OrgName', name: 'Client Name',width: 100 },
    { prop: 'BillingEmail', name: 'Email Id',width: 100 },
    { prop: 'BillingPhone', name: 'Contact No.',width: 70 },
    { name: 'Settings',width: 100 },
  ];
  @ViewChild('table', { static: true }) table: ElementRef;


  ColumnMode = ColumnMode;
  constructor(public service: CommonService) {}
  ngAfterViewInit(): void {
    this.table.nativeElement.style.height = `${this.service.screenHeight}px`;
  }

  ngOnInit(): void {
    document.getElementById('ngxtable').style.height = `${this.service.screenHeight}px`;
    this.getAllClients();
  }

  getAllClients() {
    this.service.GetAllClients('').subscribe((res) => {
      if (res && res.returncode == 200) {
        this.clientData = res.returndata;
        this.filteredList = res.returndata;
      }
    });
  }

  toViewClient(row){
    this.isviewClient = true;
    this.viewClient = row;
  }

  DeleteClient(row){
    let postparam = {};
    postparam['ID'] = row['id'];
    postparam['oauth'] = this.service.Oauth;
    // this.service.DeleteClientById(postparam).subscribe(
    //   res => {
    //     if(res && res.returncode == 200){
    //       this.service.OpenSnackBar('Delete Successfull','SUCCESS');
    //       this.getAllClients();
    //     } else {
    //       this.service.OpenSnackBar(res.returnmessage,'ERROR');
    //     }
    //   },
    //   err => {
    //     this.service.OpenSnackBar('Something went wrong','SORRY');
    //   }
    // );
  }

  SearchClient() {
    const lowerValue = this.searchClient.toLowerCase();
    this.filteredList = this.clientData.filter(
      (item) =>
        item.BillingEmail.toString().toLowerCase().indexOf(lowerValue) !== -1 ||
        !lowerValue ||
        item.BillingPhone.toLowerCase().indexOf(lowerValue) !== -1 ||
        item.OrgName.toLowerCase().indexOf(lowerValue) !== -1 ||
        item.id.toLowerCase().indexOf(lowerValue) !== -1
    );
  }
}
