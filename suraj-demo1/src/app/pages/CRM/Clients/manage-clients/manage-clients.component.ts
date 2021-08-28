import { CommonService } from 'src/app/services/common.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Clients } from 'src/app/entities/ClientsModel';
import { DeleteItemModel } from 'src/app/entities/HomeModel';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss'],
})
export class ManageClientsComponent implements OnInit, AfterViewInit {
  // Meta
  ColumnMode = ColumnMode;

  // Array Variables
  rows = [
    { sno: 1, name: 'John Doe', email: 'jd@master.com', phoneno: 345723947 },
  ];
  columns = [
    { prop: 'id', name: 'Client ID', width: 50 },
    { prop: 'OrgName', name: 'Client Name', width: 100 },
    { prop: 'BillingEmail', name: 'Email Id', width: 100 },
    { prop: 'BillingPhone', name: 'Contact No.', width: 70 },
    { name: 'Settings', width: 100 },
  ];
  data = [];
  clientData: Clients[];
  filteredList = [];

  // Boolean Variables
  isLoading = true;
  reorderable = true;
  isviewClient = false;
  isEditClient = false;

  //Object Variables
  viewClient = new Clients();

  //Any Variabls
  searchClient: any;

  //View Childs/ DOM Elements
  @ViewChild('table', { static: false }) table: ElementRef;

  constructor(public service: CommonService) {}
  ngAfterViewInit(): void {
    this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
  }

  ngOnInit(): void {
    if (this.table) {
      this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
    }
    this.getAllClients();
  }

  // API- GET Data
  getAllClients() {
    this.service.GetAllClients('').subscribe(
      (res) => {
        if (res && res.returncode == 200) {
          this.clientData = res.returndata;
          this.filteredList = res.returndata;
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      },
      (err) => {
        this.isLoading = false;
        this.service.OpenSnackBar('ERROR', 'Something went wrong!');
      }
    );
  }

  toViewClient(row) {
    this.isviewClient = true;
    this.viewClient = row;
  }

  //Delete Client
  DeleteClient(item) {
    let postparam = new DeleteItemModel();
    postparam.oauth = this.service.Oauth;
    postparam.Table = 'Client';
    postparam.ID = item.id;
    this.service.DeleteItem(postparam).subscribe(
      (res) => {
        if (res && res.returncode == 200) {
          this.service.OpenSnackBar('Delete Successfull', 'SUCCESS');
          this.getAllClients();
        } else {
          this.service.OpenSnackBar(res.returnmessage, 'ERROR');
        }
      },
      (err) => {
        this.service.OpenSnackBar('Something went wrong', 'SORRY');
      }
    );
  }

  // Search Client
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

  OpenEditModal(row) {
    this.isEditClient = true;
    this.isviewClient = true;
    let obj = this.clientData.find((x) => x.id == row?.id);
    Object.assign(this.viewClient, obj);
  }

  SaveEdit() {
    this.service.UpdateClient(this.viewClient).subscribe(
      (res) => {
        if (res.returncode == 200) {
          this.getAllClients();
          this.service.OpenSnackBar('SUCCESS', res.returnmessage);
        } else {
          this.service.OpenSnackBar('ERROR', res.returnmessage);
        }
      },
      (err) => {
        this.service.OpenSnackBar('ERROR', err);
      }
    );
    this.CloseModal();
  }

  CloseModal() {
    this.isEditClient = false;
    this.isviewClient = false;
    this.viewClient = new Clients();
  }
}
