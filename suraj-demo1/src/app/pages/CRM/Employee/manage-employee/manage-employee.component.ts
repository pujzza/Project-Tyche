import { ColumnMode } from '@swimlane/ngx-datatable';
import { CommonService } from 'src/app/services/common.service';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Employee} from 'src/app/entities/EmployeeModel';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent implements OnInit,AfterViewInit {
  rows = [
    { sno: 1, FirstName: 'John', LastName: 'Smith', Email: 'jd@master.com', Contact: '345723947', Address:'Chennai'},
  ];
  loadingIndicator = true;
  reorderable = true;
  data = [];
  EmployeeData: any[];
  isviewEmployee = false;
  viewEmployee = new Employee();
  isedit = false;
  @ViewChild('table', { static: false }) table: ElementRef;

  columns = [
    { prop: 'EmployeeID', name: 'ID',width: 50 },
    { prop: 'EmpFirstName', name: 'First Name',width: 100 },
    { prop: 'EmpLastName', name: 'Last Name',width: 100 },
    { prop: 'Email', name: 'Email ID',width: 100 },
    { prop: 'PhoneNumber', name: 'Contact',width: 70 },
    { prop: 'Address', name: 'Address',width: 70 },
    { name: 'Settings',width: 100 },
  ];

  ColumnMode = ColumnMode;
   constructor(public service: CommonService) { }

  ngOnInit(): void {
    document.getElementById('ngxtable').style.height = `${
      screen.height - 170
    }px`;
    this.GetAllEmployees();
  }

  ngAfterViewInit(): void {
    this.table.nativeElement.style.height = `${this.service.screenH}px`;
  }

  GetAllEmployees() {
    this.service.GetAllEmployees('').subscribe((res) => {
      if (res && res.returncode == 200) {
        this.EmployeeData = res.returndata;
      }
    });
  }

  toViewEmployee(row){
    this.isviewEmployee = true;
    this.viewEmployee = row;
  }
  

  toEditEmployee(row){
    this.isviewEmployee = true;
    this.viewEmployee = row;
    this.isedit = true;

  }
}
