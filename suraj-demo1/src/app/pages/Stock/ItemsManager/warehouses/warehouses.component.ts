import { MatDialog } from '@angular/material/dialog';
import { WarehouseModel } from './../../../../entities/StockModels';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { CommonService } from 'src/app/services/common.service';
import { DeleteItemModel } from 'src/app/entities/HomeModel';
import { DeleteConfirmComponent } from 'src/app/Common/DeleteConfirm.component';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss'],
})
export class WarehousesComponent implements OnInit {
  isLoading = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  SortType = SortType;
  columns = [
    { prop: 'WarehouseId', name: '#', width: 10 },
    { prop: 'WareHouseName', name: 'Warehouse Name', width: 100 },
    { prop: 'ContactNo', name: 'ContactNo', width: 50 },
    { prop: 'City', name: 'City', width: 70 },
    { prop: 'Country', name: 'Country', width: 50 },
    // { prop: 'totalproduct', name: 'Total Product', width: 50 },
    // { prop: 'totalstock', name: 'Total Stock', width: 50 },
    { name: 'Settings', width: 100 },
  ];
  @ViewChild('table', { static: false }) table: ElementRef;

  data = [];
  warehouseData: WarehouseModel[];
  filteredList = [];
  isnewWarehouse = false;
  isEditWarehouse = false;

  searchWarehouse: any;

  warehouse = new WarehouseModel();
  constructor(public service: CommonService,private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
  }

  ngOnInit(): void {
    if (this.table) {
      this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
    }
    this.GetAllWareHouse();
  }

  closeNewWarehouse() {
    this.isnewWarehouse = false;
    this.isEditWarehouse = false;
    this.warehouse = new WarehouseModel();
  }

  AddWarehouse() {
    //console.log(this.warehouse);
    this.service.AddWarehouse(this.warehouse).subscribe(
      (res) => {
        if (res.returncode == 200) {
          this.GetAllWareHouse();
          this.service.OpenSnackBar('SUCCESS', res.returnmessage);
        } else {
          this.service.OpenSnackBar('ERROR', res.returnmessage);
        }
      },
      (err) => {
        this.service.OpenSnackBar('ERROR', err);
      }
    );
    this.closeNewWarehouse();
  }

  GetAllWareHouse() {
    this.service.GetWareHouse().subscribe(
      (res) => {
        this.filteredList = res['returndata'];
        this.warehouseData = res['returndata'];
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.service.OpenSnackBar('ERROR', 'Something went wrong!');
      }
    );
  }

  // Search Client
  SearchMethod() {
    const lowerValue = this.searchWarehouse.toLowerCase();
    this.filteredList = this.warehouseData.filter(
      (item) =>
        item.WareHouseName.toString().toLowerCase().indexOf(lowerValue) !==
          -1 ||
        !lowerValue ||
        item.Address.toLowerCase().indexOf(lowerValue) !== -1 ||
        item.ContactNo.toLowerCase().indexOf(lowerValue) !== -1 ||
        item.Country.toLowerCase().indexOf(lowerValue) !== -1 ||
        item.City.toLowerCase().indexOf(lowerValue) !== -1 ||
        item.WarehouseId.indexOf(lowerValue) !== -1
    );
  }

  ViewEditWarehouse(row) {
    let obj = this.warehouseData.find((r) => r.WarehouseId == row?.WarehouseId);
    Object.assign(this.warehouse, obj);
    this.isEditWarehouse = true;
  }

  SaveEdit() {
    this.service.UpdateWarehouse(this.warehouse).subscribe(
      (res) => {
        if (res.returncode == 200) {
          this.GetAllWareHouse();
          this.service.OpenSnackBar('SUCCESS', res.returnmessage);
        } else {
          this.service.OpenSnackBar('ERROR', res.returnmessage);
        }
      },
      (err) => {
        this.service.OpenSnackBar('ERROR', err);
      }
    );
    this.closeNewWarehouse();
  }

  DeleteWarehouse(item) {
    let postparam = new DeleteItemModel();
    postparam.Table = 'Warehouse';
    postparam.ID = item.WarehouseId;
    this.service.DeleteItem(postparam).subscribe(
      (res) => {
        if (res) {
          this.service.OpenSnackBar('Delete Successfull', 'SUCCESS');
          this.GetAllWareHouse();
        } else {
          this.service.OpenSnackBar(res.returnmessage, 'ERROR');
        }
      },
      (err) => {
        this.service.OpenSnackBar('Something went wrong', 'SORRY');
      }
    );
  }

  openDelete(row){
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',height: '200px',direction: 'ltr',
      data: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.DeleteWarehouse(row);
      }
    });
  }
}
