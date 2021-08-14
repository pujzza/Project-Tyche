import { Oauth } from './../services/common.service';
export class ProductsModel {
  oauth?: string;
  ProductCategory: string;
  Products: SubProducts[];
}

export class InventoryItem {
  oauth?: string;
  ItemId: string;
  ItemName: string;
  Category: string;
  Bundles: string;
  ItemPerBundle: string;
  AlertQuantity: string;
}

export class SubProducts {
  ProductCode: string;
  ProductMaterial: string;
  ProductSize: string;
  ProductPrice: string;
  ProductRawMaterials: string[];
  isSaved?: boolean = false;
  ProductCategory?: string;
  ProductId?: string;
}

// ------------ Purchase Order Models -------------- //
//START
export class PurchaseOrder {
  SupplierName?: string;
  SupplierContact?: string;
  SupplierID?: string;
  Items?: Item[];
  OrderDueDate?: Date;
  TotalAmount?: string;
  OrderID?: string;
  oauth?: string;
}

export class Item {
  ItemId?: string;
  ItemName?: string;
  BundleCount?: string;
  Price?: string;
  ItemStatus?: string;
  Amount?: string;
  isSave?: boolean;
  isEdit?: boolean;
  errorText?: string;

  constructor() {
    this.isEdit = true;
    this.isSave = false;
  }
}
//-------------END----------------------------------------//
export class WarehouseModel {
  WarehouseId?: string;
  WareHouseName?: string;
  Country?: string;
  ContactNo?: string;
  City?: string;
  Address?: string;
  Pincode?: string;
  oauth?: string;

  constructor(){
    this.oauth = Oauth;
  }
}
