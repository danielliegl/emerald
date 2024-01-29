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
    { path: '/user-panel/user-panel/dashboard', title: 'Studies',  icon: 'dashboard', class: '' },
    { path: '/user-panel/user-panel/create_study', title: 'Create Project', icon: 'create', class: ''},
    //{ path: 'user-profile', title: 'Settings',  icon:'person', class: '' },
    { path: '/user-panel/user-panel/logout', title: 'Logout',  icon:'logout', class: '' },

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
