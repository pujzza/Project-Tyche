import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss']
})
export class ManageClientsComponent implements OnInit {
  rows = [{sno: 1, name: 'John Doe', email: 'jd@master.com',phoneno: 345723947}];
  loadingIndicator = true;
  reorderable = true;
  data = [];

  columns = [{ prop: 'sno', name:'Sno.' }, { prop: 'name', name:'Client Name' }, 
  { prop: 'email', name: 'Email Id'},{ prop: 'phoneno', name: 'Contact No.' },{ name: 'Settings' }
];

  ColumnMode = ColumnMode;
  constructor() { }

  ngOnInit(): void {
  }

}
