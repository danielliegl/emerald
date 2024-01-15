import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from "./login/login.component";
import { ReviewerPanelComponent } from './reviewer-panel/reviewer-panel.component';
import { ProjectOwnerPanelComponent } from './project-owner-panel/project-owner-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

// Here the routing via URL links happens
const routes: Routes =[
  {path: 'login', component: LoginComponent },
  {path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route to login
  // {path: 'reviewer-panel', component: ReviewerPanelComponent },
  // {path: 'project-owner-panel', component: ProjectOwnerPanelComponent},
  // Panels for the Admin and Users (Project-Owner and Reviewer)
  {path: 'user-panel', component: UserPanelComponent},
  // {path: 'admin-panel', component: AdminPanelComponent},

  // Admin Panel 
  {path: 'admin-panel', component: AdminPanelComponent,
    children: [{
      path: 'admin-panel',
      loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
    }]
  },
  {path: 'admin-dashboard', component: AdminDashboardComponent},
  // {path: 'users', component: UsersComponent},
  // What is happening.
  {path: 'admin', component: AdminLayoutComponent,
    children: [{
      path: 'admin-dashboard',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
