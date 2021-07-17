import { Products } from './ClientsModel';
export class BillHistory{
    returnmessage: string;
    returncode: number;
    orderid: string|undefined;
    products: Products[]|undefined;
    totalamount: string|undefined;
    paidamount: string|undefined;
}

export class Orders{
    orderid: string;
    paidamount: string;
    totalamount: string;
    dueAmt?:number;
    firstname?:string;
    lastname?:string;
    phonenumber?:string;
    orderDate?:string;
}

export class payAmt{
    oauth: string;
    paidamount: string;
    orderid: string;
}