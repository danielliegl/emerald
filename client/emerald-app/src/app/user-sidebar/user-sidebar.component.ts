import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    // { path: '/admin/admin-dashboard/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-panel/user-panel/dashboard', title: 'Projects',  icon: 'dashboard', class: '' },
    //{ path: 'user-profile', title: 'Settings',  icon:'person', class: '' },
    { path: '/user-panel/user-panel/logout', title: 'Logout',  icon:'logout', class: '' },

];

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  profile: any = null;
  menuItems: any[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProfile()
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  getProfile(): void {
    this.http.post('../.netlify/functions/get_profile', null).subscribe((response) => {
      this.profile = response;
      console.log(this.profile.project_owner)
      if(this.profile.project_owner) {
        ROUTES.splice(1, 0,     { path: '/user-panel/user-panel/create_study', title: 'Create Project', icon: 'create', class: ''},);
        console.log(ROUTES);
      }
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    })
  }

}
