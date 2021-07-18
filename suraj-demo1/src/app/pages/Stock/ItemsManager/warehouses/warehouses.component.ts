import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { NewWarehouse } from 'src/app/entities/StockModels';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss'],
})
export class WarehousesComponent implements OnInit {
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  SortType = SortType;
  columns = [
    { prop: 'id', name: '#', width: 10 },
    { prop: 'itemname', name: 'Warehouse Name', width: 100 },
    { prop: 'city', name: 'City', width: 70 },
    { prop: 'contact', name: 'ContactNo', width: 50 },
    { prop: 'totalproduct', name: 'Total Product', width: 50 },
    { prop: 'totalstock', name: 'Total Stock', width: 50 },
    { name: 'Settings', width: 100 },
  ];
  @ViewChild('table', { static: false }) table: ElementRef;

  data = [];
  isnewWarehouse = false;

  warehouse = new NewWarehouse();
  constructor(public service: CommonService) {}

  ngAfterViewInit(): void {
    this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
  }

  ngOnInit(): void {
    if (this.table) {
      this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
    }
  }

  closeNewWarehouse() {
    this.isnewWarehouse = false;
    this.warehouse = new NewWarehouse();
  }

  AddWarehouse() {
    console.log(this.warehouse);
    this.closeNewWarehouse();
  }
}
