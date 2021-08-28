export const SalesSub = [
  { id: 1, title: 'New Invoice', route: 'Sales/NewInvoice',roles: 0 },
  { id: 2, title: 'Manage Invoice', route: 'Sales/ManageInvoice',roles: 0 },
  { id: 3, title: 'Invoice Queue', route: 'Sales/InvoiceQueue',roles: 0 },
  // {  id: 2, title: 'InvoiceTemplate', route: 'Sales/InvoiceTemplate'}
];

export const ItemManagerSub = [
  { id: 1, title: 'New Product', route: 'ItemManager/NewProduct', roles: 1 },
  { id: 2, title: 'Manage Products', route: 'ItemManager/ManageProduct',roles: 1 },
  // { id: 3, title: 'Product Categories', route: 'ItemManager/ManageProduct' },
  { id: 4, title: 'Warehouses', route: 'ItemManager/Warehouses', roles: 1 },
  // { id: 5, title: 'Stock Transfer', route: 'ItemManager/StockTransfer' },
];

export const PurchaseSub = [
  { id: 1, title: 'New Order', route: 'Purchase/NewOrder',roles: 0 },
  { id: 2, title: 'Manage Order', route: 'Purchase/ManageOrder',roles: 0 },
];
export const StockReturnSub = [
  { id: 1, title: 'Add New', route: 'StockReturn/AddNewReturn' },
  { id: 2, title: 'Records', route: 'StockReturn/Records' },
];
export const ClientSub = [
  { id: 1, title: 'New Client', route: 'Clients/NewClient',roles: 0 },
  { id: 2, title: 'Manage Clients', route: 'Clients/ManageClient', roles: 0 },
];
export const EmployeeSub = [
  { id: 1, title: 'New Employee', route: 'Employee/NewEmployee',roles: 1 },
  { id: 2, title: 'Manage Employees', route: 'Employee/ManageEmployee',roles: 1 },
];

export const InventorySub = [
  { id: 1, title: 'Add Inventory', route: 'Inventory/NewInventory',roles: 1 },
  { id: 2, title: 'Manage Inventory', route: 'Inventory/ManageInventory',roles: 1 },
];

