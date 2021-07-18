import { ColumnMode } from '@swimlane/ngx-datatable';
import { CommonService } from 'src/app/services/common.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Employee } from 'src/app/entities/EmployeeModel';
import { DeleteItemModel } from 'src/app/entities/HomeModel';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss'],
})
export class ManageEmployeeComponent implements OnInit, AfterViewInit {
  // Meta Data
  ColumnMode = ColumnMode;

  // Array Variables
  rows = [
    {
      sno: 1,
      FirstName: 'John',
      LastName: 'Smith',
      Email: 'jd@master.com',
      Contact: '345723947',
      Address: 'Chennai',
    },
  ];
  columns = [
    { prop: 'EmployeeID', name: 'ID', width: 50 },
    { prop: 'EmpFirstName', name: 'First Name', width: 100 },
    { prop: 'EmpLastName', name: 'Last Name', width: 100 },
    { prop: 'Email', name: 'Email ID', width: 100 },
    { prop: 'PhoneNumber', name: 'Contact', width: 70 },
    { prop: 'Address', name: 'Address', width: 70 },
    { name: 'Settings', width: 100 },
  ];
  EmployeeData: any[];
  filteredList = [];

  // Boolean Variables
  loadingIndicator = true;
  reorderable = true;
  isedit = false;
  isviewEmployee = false;

  // Object Variables
  viewEmployee = new Employee();

  // Any Variables
  searchEmployee: any;

  // View Childs / DOM Elemetns
  @ViewChild('table', { static: false }) table: ElementRef;

  constructor(public service: CommonService) {}

  ngOnInit(): void {
    if (this.table) {
      this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
    }
    this.GetAllEmployees();
  }

  ngAfterViewInit(): void {
    this.table.nativeElement.style.maxheight = `${this.service.screenH}px`;
  }

  // API - Get all Employees
  GetAllEmployees() {
    this.service.GetAllEmployees('').subscribe((res) => {
      if (res && res.returncode == 200) {
        this.EmployeeData = res.returndata;
        this.filteredList = this.EmployeeData;
      }
    });
  }

  // To view Employee
  toViewEmployee(row) {
    this.isviewEmployee = true;
    this.viewEmployee = row;
  }

  // To Edit Employee
  toEditEmployee(row) {
    this.isviewEmployee = true;
    this.viewEmployee = row;
    this.isedit = true;
  }

  // API - Delete Employee
  DeleteItem(item) {
    let postparam = new DeleteItemModel();
    postparam.oauth = this.service.Oauth;
    postparam.Table = 'Employee';
    postparam.ID = item.EmployeeID;
    this.service.DeleteItem(postparam).subscribe(
      (res) => {
        if (res && res.returncode == 200) {
          this.service.OpenSnackBar('Delete Successfull', 'SUCCESS');
          this.GetAllEmployees();
        } else {
          this.service.OpenSnackBar(res.returnmessage, 'ERROR');
        }
      },
      (err) => {
        this.service.OpenSnackBar('Something went wrong', 'SORRY');
      }
    );
  }

  // Search Employee Filter
  SearchEmployeeMethod() {
    const lowerValue = this.searchEmployee.toLowerCase();
    this.filteredList = this.EmployeeData.filter(
      (item) =>
        item.EmployeeID.toString()?.toLowerCase().indexOf(lowerValue) !== -1 ||
        !lowerValue ||
        item.PhoneNumber?.toLowerCase().indexOf(lowerValue) !== -1 ||
        item.EmpFirstName?.toLowerCase().indexOf(lowerValue) !== -1 ||
        item.EmpLastName?.toLowerCase().indexOf(lowerValue) !== -1 ||
        item.Email?.toLowerCase().indexOf(lowerValue) !== -1
    );
  }
}
