export const SalesSub = [
  { id: 1, title: 'New Invoice', route: 'Sales/NewInvoice',roles: ['Admin','Employee'] },
  { id: 2, title: 'Manage Invoice', route: 'Sales/ManageInvoice',roles: ['Admin','Employee','Accountant'] },
  { id: 3, title: 'Invoice Queue', route: 'Sales/InvoiceQueue',roles: ['Admin','Accountant'] },
  // {  id: 2, title: 'InvoiceTemplate', route: 'Sales/InvoiceTemplate'}
];

export const ItemManagerSub = [
  { id: 1, title: 'New Product', route: 'ItemManager/NewProduct', roles: ['Admin'] },
  { id: 2, title: 'Manage Products', route: 'ItemManager/ManageProduct',roles: ['Admin'] },
  // { id: 3, title: 'Product Categories', route: 'ItemManager/ManageProduct' },
  { id: 4, title: 'Warehouses', route: 'ItemManager/Warehouses', roles: ['Admin'] },
  // { id: 5, title: 'Stock Transfer', route: 'ItemManager/StockTransfer' },
];

export const PurchaseSub = [
  { id: 1, title: 'New Order', route: 'Purchase/NewOrder',roles: ['Admin'] },
  { id: 2, title: 'Manage Order', route: 'Purchase/ManageOrder',roles: ['Admin'] },
];
export const StockReturnSub = [
  { id: 1, title: 'Add New', route: 'StockReturn/AddNewReturn' ,roles: ['Admin']},
  { id: 2, title: 'Records', route: 'StockReturn/Records',roles: ['Admin'] },
];
export const ClientSub = [
  { id: 1, title: 'New Client', route: 'Clients/NewClient',roles: ['Admin'] },
  { id: 2, title: 'Manage Clients', route: 'Clients/ManageClient', roles: ['Admin'] },
];
export const EmployeeSub = [
  { id: 1, title: 'New Employee', route: 'Employee/NewEmployee',roles: ['Admin'] },
  { id: 2, title: 'Manage Employees', route: 'Employee/ManageEmployee',roles: ['Admin'] },
];

export const InventorySub = [
  { id: 1, title: 'Add Inventory', route: 'Inventory/NewInventory',roles: ['Admin','Employee'] },
  { id: 2, title: 'Manage Inventory', route: 'Inventory/ManageInventory',roles: ['Admin','Employee'] },
];

