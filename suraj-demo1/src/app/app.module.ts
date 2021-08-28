import { AuthGuardService } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewSalesInvoiceComponent } from './pages/Sales/new-sales-invoice/new-sales-invoice.component';
import { ManageSalesInvoiceComponent } from './pages/Sales/manage-sales-invoice/manage-sales-invoice.component';
import { NewProductComponent } from './pages/Stock/ItemsManager/new-product/new-product.component';
import { ManageProductComponent } from './pages/Stock/ItemsManager/manage-product/manage-product.component';
import { WarehousesComponent } from './pages/Stock/ItemsManager/warehouses/warehouses.component';
import { StockTransferComponent } from './pages/Stock/ItemsManager/stock-transfer/stock-transfer.component';
import { ProductCategoriesComponent } from './pages/Stock/ItemsManager/product-categories/product-categories.component';
import { NewOrderComponent } from './pages/Stock/PurchaseOrder/new-order/new-order.component';
import { ManageOrderComponent } from './pages/Stock/PurchaseOrder/manage-order/manage-order.component';
import { AddStockReturnComponent } from './pages/Stock/StockReturn/add-stock-return/add-stock-return.component';
import { StockReturnRecordsComponent } from './pages/Stock/StockReturn/stock-return-records/stock-return-records.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddClientComponent } from './pages/CRM/Clients/add-client/add-client.component';
import { ManageClientsComponent } from './pages/CRM/Clients/manage-clients/manage-clients.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeComponent } from './pages/CRM/Employee/add-employee/add-employee.component';
import { ManageEmployeeComponent } from './pages/CRM/Employee/manage-employee/manage-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { AddInventoryComponent } from './pages/Stock/Inventory/add-inventory/add-inventory.component';
import { ManageInventoryComponent } from './pages/Stock/Inventory/manage-inventory/manage-inventory.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { InvoiceTemplateComponent } from './pages/Sales/invoice-template/invoice-template.component';
import { LoaderComponent } from './loader/loader.component';
import { InvoiceQueueComponent } from './pages/Sales/invoice-queue/invoice-queue.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewSalesInvoiceComponent,
    ManageSalesInvoiceComponent,
    NewProductComponent,
    ManageProductComponent,
    WarehousesComponent,
    StockTransferComponent,
    ProductCategoriesComponent,
    NewOrderComponent,
    ManageOrderComponent,
    AddStockReturnComponent,
    StockReturnRecordsComponent,
    LoginComponent,
    DashboardComponent,
    AddClientComponent,
    ManageClientsComponent,
    AddEmployeeComponent,
    ManageEmployeeComponent,
    AddInventoryComponent,
    ManageInventoryComponent,
    InvoiceTemplateComponent,
    LoaderComponent,
    InvoiceQueueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
