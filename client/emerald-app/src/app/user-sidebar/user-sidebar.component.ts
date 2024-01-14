import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    // { path: '/admin/admin-dashboard/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/admin/admin-dashboards/guidelines', title: 'Guidelines',  icon: 'dashboard', class: '' },
    { path: '/admin/admin-dashboard/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/admin/admin-dashboard//table-list', title: 'Table List',  icon:'content_paste', class: '' },
];

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}