import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserSidebarComponent } from 'app/user-sidebar/user-sidebar.component';
import { AdminSidebarComponent } from 'app/admin-sidebar/admin-sidebar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,

  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    UserSidebarComponent,
    AdminSidebarComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    UserSidebarComponent,
    AdminSidebarComponent
  ]
})
export class ComponentsModule { }
