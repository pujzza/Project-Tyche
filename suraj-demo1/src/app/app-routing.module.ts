import { ManageEmployeeComponent } from './pages/CRM/Employee/manage-employee/manage-employee.component';
import { AddEmployeeComponent } from './pages/CRM/Employee/add-employee/add-employee.component';
import { ManageClientsComponent } from './pages/CRM/Clients/manage-clients/manage-clients.component';
import { AddClientComponent } from './pages/CRM/Clients/add-client/add-client.component';
import { AddStockReturnComponent } from './pages/Stock/StockReturn/add-stock-return/add-stock-return.component';
import { NewOrderComponent } from './pages/Stock/PurchaseOrder/new-order/new-order.component';
import { StockTransferComponent } from './pages/Stock/ItemsManager/stock-transfer/stock-transfer.component';
import { WarehousesComponent } from './pages/Stock/ItemsManager/warehouses/warehouses.component';
import { ManageProductComponent } from './pages/Stock/ItemsManager/manage-product/manage-product.component';
import { NewProductComponent } from './pages/Stock/ItemsManager/new-product/new-product.component';
import { ManageSalesInvoiceComponent } from './pages/Sales/manage-sales-invoice/manage-sales-invoice.component';
import { ManageOrderComponent } from './pages/Stock/PurchaseOrder/manage-order/manage-order.component';
import { LoginComponent } from './login/login.component';
import { NewSalesInvoiceComponent } from './pages/Sales/new-sales-invoice/new-sales-invoice.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockReturnRecordsComponent } from './pages/Stock/StockReturn/stock-return-records/stock-return-records.component';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  {
    path: 'Home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Sales/NewInvoice', component: NewSalesInvoiceComponent },
      { path: 'Sales/ManageInvoice', component: ManageSalesInvoiceComponent },
      { path: 'ItemManager/NewProduct', component: NewProductComponent },
      { path: 'ItemManager/ManageProduct', component: ManageProductComponent },
      { path: 'ItemManager/Warehouses', component: WarehousesComponent },
      { path: 'ItemManager/StockTransfer', component: StockTransferComponent },
      { path: 'Purchase/NewOrder', component: NewOrderComponent },
      { path: 'Purchase/ManageOrder', component: ManageOrderComponent },
      { path: 'StockReturn/AddNewReturn', component: AddStockReturnComponent },
      { path: 'StockReturn/Records', component: StockReturnRecordsComponent },
      { path: 'Clients/NewClient', component: AddClientComponent },
      { path: 'Clients/ManageClient', component: ManageClientsComponent },
      { path: 'Employee/NewEmployee', component: AddEmployeeComponent },
      { path: 'Employee/ManageEmployee', component: ManageEmployeeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
