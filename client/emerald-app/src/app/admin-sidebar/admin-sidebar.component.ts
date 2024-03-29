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
    // { path: '/admin/admin-dashboard/guidelines', title: 'Guidelines',  icon: 'dashboard', class: '' },
    // person icon
    { path: '/admin-panel/admin-panel/users', title: 'Manage Users',  icon:'assignment_ind', class: '' },
    {path: '/user-panel', title: 'User Panel', icon:'dashboard', class: ''},
    { path: '/admin-panel/admin-panel/logout', title: 'Logout',  icon:'logout', class: '' },
];

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
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
