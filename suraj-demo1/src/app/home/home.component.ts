import { NavigationEnd, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientSub, EmployeeSub, ItemManagerSub, PurchaseSub, SalesSub, StockReturnSub } from './home-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit,AfterViewInit {

  @ViewChild('sidenav', { static: true }) sidenav: ElementRef;
  @ViewChild('main', { static: true }) main: ElementRef;
  
  //Boolean variables
  isSideNavOpen = true;
  isStockOpen = false;
  isCRMOpen = false;
  isSales = false;
  isClient = false;
  isItemManager = false;
  isPurchaseOrder = false;
  isStockReturn = false;
  isprofclicked = false;
  isEmployee = false;
  isSelected = 'Dashboard';
  appName = 'Project Tyche';

  //Imports constants
  SalesSub= SalesSub;
  ItemManagerSub = ItemManagerSub;
  PurchaseSub = PurchaseSub;
  StockReturnSub=StockReturnSub;
  ClientSub=ClientSub;
  EmployeeSub= EmployeeSub;

  constructor(private route: Router) {
    this.route.events.subscribe(e => {
      this.isSelected = this.route.url.split('/Home/')[1];
      if(this.isSelected.includes('ItemManager')){
        this.isItemManager = true
      } else {
        this.isItemManager = false
      }
      if(this.isSelected.includes('Sales')){
        this.isSales = true
      } else {
        this.isSales = false
      }
      if(this.isSelected.includes('Purchase')){
        this.isPurchaseOrder = true
      } else {
        this.isPurchaseOrder = false
      }
      if(this.isSelected.includes('StockReturn')){
        this.isStockReturn = true
      } else {
        this.isStockReturn = false
      }
      if(this.isSelected.includes('Clients')){
        this.isClient = true
      } else {
        this.isClient = false
      }
      if(this.isSelected.includes('Employee')){
        this.isEmployee = true
      } else {
        this.isEmployee = false
      }
    });
  }

  ngOnInit(): void {
    if (this.isSideNavOpen) {
      this.openNav();
    }
  }

  ngAfterViewInit() {
  }

  openNav() {
    this.isSideNavOpen = true;
    this.sidenav.nativeElement.style.width = '200px';
    this.main.nativeElement.style.width = 'Calc(100% - 200px)';
  }

  closeNav() {
    this.sidenav.nativeElement.style.width = '70px';
    this.main.nativeElement.style.width = 'Calc(100% - 70px)';
    this.isSideNavOpen = false;
    this.isSales = false;
    this.isClient = false;
    this.isItemManager = false;
    this.isPurchaseOrder = false;
    this.isStockReturn = false;
  }

  NavigatePages(route) {
    this.route.navigateByUrl(`Home/${route}`);
  }

  logout(){
    this.route.navigateByUrl('');
  }
}
