import { CommonService } from 'src/app/services/common.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { ProductsModel, SubProducts } from 'src/app/entities/StockModels';
import { DeleteItemModel } from 'src/app/entities/HomeModel';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from 'src/app/Common/DeleteConfirm.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit, AfterViewInit {
  //Meta
  ColumnMode = ColumnMode;
  SortType = SortType;

  //Boolean Variables
  loadingIndicator = true;
  reorderable = true;
  isLoading = true;

  // Any Variables
  searchProduct: any;

  //Array Variabls
  data: SubProducts[] = [];
  filteredList = [];
  columns = [
    { prop: 'ProductId', name: '#', width: 10 },
    { prop: 'ProductCode', name: 'Code', width: 50 },
    { prop: 'ProductCategory', name: 'Category', width: 100 },
    { prop: 'ProductPrice', name: 'Price', width: 50 },
    { prop: 'ProductMaterial', name: 'Material', width: 100 },
    { prop: 'ProductSize', name: 'Size', width: 50 },
    { name: 'Settings', width: 100 },
  ];

  //View Childs / DOM Elements
  @ViewChild('table', { static: false }) table: ElementRef;

  constructor(public service: CommonService,private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
  }

  ngOnInit(): void {
    if (this.table) {
      this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
    }
    this.getAllProducts();
  }

  // API - GET Products
  getAllProducts() {
    this.service.GetAllProducts().subscribe(
      (res) => {
        if (res && res.returncode == 200) {
          this.data = res.returndata;
          this.filteredList = res.returndata;
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      },
      (err) => {this.isLoading = false;
        this.service.OpenSnackBar('ERROR','Something went wrong!')
        }
    );
  }

  // Search Products
  SearchProduct() {
    const lowerValue = this.searchProduct.toLowerCase();
    this.filteredList = this.data.filter(
      (item) =>
        item.ProductCode.toLowerCase().indexOf(lowerValue) !== -1 ||
        !lowerValue ||
        item.ProductMaterial.toLowerCase().indexOf(lowerValue) !== -1 ||
        item.ProductSize.toLowerCase().indexOf(lowerValue) !== -1
    );
  }

  // Delete Items - API
  DeleteItem(item) {
    let postparam = new DeleteItemModel();
    postparam.oauth = this.service.Oauth;
    postparam.Table = 'Product';
    postparam.ID = item.ProductId;
    this.service.DeleteItem(postparam).subscribe(
      (res) => {
        if (res) {
          this.service.OpenSnackBar('Delete Successfull', 'SUCCESS');
          this.getAllProducts();
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
        this.DeleteItem(row);
      }
    });
  }
}
