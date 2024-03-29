import { Oauth } from './../services/common.service';
export class CustomerValidateResponse{
    returncode:number|undefined;
    returnmessage: string|undefined;
    returndata?: CustomerDetails|undefined;
}

export class CustomerDetails{
    oauth? :string|undefined;
    id? : number;
    firstname?: string;
    lastname?: string;
    email?: string;
    phonenumber: string;
}

export class CustomerValidateRequest{
    oauth:string;
    phonenumber: string;
}

export class Products{
    id? : string|undefined;
    product: string;
    price: string;
    description ?: string;
    category_id? : string;
    created?:string;
    count?:number|undefined;
    orderid?: string|undefined;
    totalamount?: string|undefined;
    paidamount?: string|undefined;
    cid?: string|undefined;
    material?:string|undefined;
    size?:string|undefined;
}

export class BillModel{
    cid: string;
    eid: string;
    orderid: string;
    totalamount: string;
    paidamount:string;
    oauth:string;
    products:Products[]|undefined;
}

export class Clients {
    OrgName:        string;
    id:             string;
    BillingPhone:   string;
    BillingAddress: string;
    BillingCity:    string;
    BillingCountry: string;
    BillingEmail:   string;
    BillingTaxId:   string;
    BillingPostBox: string;
    oauth:          string;

    constructor(){
        this.oauth = Oauth;
    }
}