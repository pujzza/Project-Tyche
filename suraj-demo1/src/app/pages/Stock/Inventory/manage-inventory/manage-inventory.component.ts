import { Component, OnInit } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.component.html',
  styleUrls: ['./manage-inventory.component.scss']
})
export class ManageInventoryComponent implements OnInit {
data =[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  SortType = SortType;
  columns = [
    { prop: 'id', name: '#',width: 10 },
    { prop: 'itemname', name: 'Item Name',width: 100 },
    { prop: 'size', name: 'Size',width: 50 },
    { prop: 'material', name: 'Material',width: 70 },
    { prop: 'bundle', name: 'Bundle Count',width: 50 },
    { prop: 'perbundle', name: 'Per Bundle',width: 50 },
    { name: 'Settings',width: 100 },
  ];
  constructor(public service: CommonService) {
  }

  ngOnInit(): void {
    document.getElementById('ngxtable').style.height = `${screen.height - 170}px`;
  }

}
