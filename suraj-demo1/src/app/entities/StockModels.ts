export class ProductsModel {
  oauth?: string;
  ProductCategory: string;
  products: SubProducts[];
}

export class InventoryItem {
  oauth?: string;
  itemid?: string;
  itemname: string;
  size: string;
  material: string;
  bundles: string;
  perbundle: string;
  alerQty: string;
  warehouse: string;
}

export class NewWarehouse {
  oauth?: string;
  warehouseid?: string;
  warehousename: string;
  address: string;
  city: string;
  country: string;
  contactno: string;
  pincode: string;
}

export class SubProducts {
  ProductCode: string;
  ProductMaterial: string;
  ProductSize: string;
  ProductPrice: string;
  ProductRawMaterials: string;
  isSaved?: boolean = false;
}
