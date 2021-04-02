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


export interface CreateClientReq {
    OrgName:     string;
    PhoneNumber: string;
    Email:       string;
    Address:     string;
    City:        string;
    Country:     string;
    PostBox:     number;
    TaxId:       string;
    oauth:       string;
}


export interface CreateClientRes {
    returnmessage: string;
    returncode:    number;
    returndata:    CreateClientReturndata;
}

export interface CreateClientReturndata {
    oauth:          string;
    OrgName:        string;
    BillingPhone:   string;
    BillingAddress: string;
    BillingCity:    string;
    BillingCountry: string;
    BillingEmail:   string;
    BillingPostBox: string;
    BillingTaxID:   string;
}

export interface UpdateClientReq {
    OrgName:     string;
    PhoneNumber: string;
    ID:          string;
    Email:       string;
    Address:     string;
    City:        string;
    Country:     string;
    PostBox:     string;
    TaxId:       string;
    oauth:       string;
}


export interface UpdateClientRes {
    returnmessage: string;
    returncode:    number;
    returndata:    UpdateClientReturn;
}

export interface UpdateClientReturn {
    oauth:          string;
    OrgName:        null;
    ID:             string;
    BillingPhone:   string;
    BillingAddress: string;
    BillingCity:    string;
    BillingCountry: string;
    BillingEmail:   string;
    BillingTaxId:   null;
    BillingPostBox: null;
}

