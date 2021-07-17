import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { CreateEmployeeReq } from 'src/app/entities/EmployeeModel';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  isemployeecreated = false;

  Employee: CreateEmployeeReq = new CreateEmployeeReq();

  constructor(public service: CommonService) {}

  ngOnInit(): void {}

  AddEmployee() {
    this.Employee.oauth = this.service.Oauth;
    this.service.CreateEmployee(this.Employee).subscribe(
      (res) => {
        if (res.returncode == 200) {
          this.isemployeecreated = true;
          this.service.OpenSnackBar('Employee Created!', 'SUCCESS');
          this.Employee = new CreateEmployeeReq();
        } else {
          this.isemployeecreated = false;
          this.service.OpenSnackBar('Employee Not Created!', 'FAILED');
        }
      },
      (error) => {
        this.service.OpenSnackBar('Something went wrong', 'SORRY');
      }
    );
    console.log(this.Employee);
  }
}
