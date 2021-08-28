import { Oauth } from './../services/common.service';
export const NavMenu = [
  {
    name: 'Dashboard',
    isEmploye: true,
    route: 'Home/Customer',
  },
  {
    name: 'Clients',
    isEmploye: true,
    route: 'Home/Clients',
  },
  {
    name: 'Products',
    isEmploye: true,
    route: 'Home',
  },
  {
    name: 'Billing History',
    isEmploye: true,
    route: 'Home/BillHistory',
  },
];

export class DeleteItemModel {
  ID: string;
  Table: string;
  oauth: string;

  constructor(){
    this.oauth = Oauth;
  }
}
