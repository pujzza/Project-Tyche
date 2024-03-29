import { Oauth } from './../services/common.service';

export class CreateEmployeeReq{
    oauth: string;
    EmpFirstName: string;
    EmpLastName: string;
    Address: string;
    PhoneNumber: string;
    EmpEmailID:string;
    EmpPassword:string;
    Employee_ID: string;
    Role: string;
    EmpPhoneNumber: string;
}

export class CreateEmployeeReturndata {
    oauth: string;
    EmpFirstName: string;
    EmpLastName: string;
    EmpAddress: string;
    EmpPhoneNumber: string;
    EmpEmailID:string;
    EmpPassword:string;
    Role: string;
    Employee_ID: string;

}

export class CreateEmployeeRes {
    returnmessage: string;
    returncode:    number;
    returndata:    CreateEmployeeReturndata;
}

export class UpdateEmployeeReq{
    oauth: string;
    EmpFirstName: string;
    EmpLastName: string;
    EmpAddress: string;
    EmpPhoneNumber: string;
    EmpEmailID:string;
    EmpPassword:string;
    Employee_ID: string;
    Role: string;
}

export class UpdateEmployeeRes {
    returnmessage: string;
    returncode:    number;
    returndata:    UpdateEmployeeReq;
}

export class Employee {
    EmpFirstName: string;
    EmpLastName: string;
    EmpAddress: string;
    EmpPhoneNumber: string;
    EmpEmailID:string;
    EmpPassword:string;
    EmployeeID: string;
    Role: string;
    oauth: string;

    constructor(){
        this.oauth = Oauth;
    }

}
