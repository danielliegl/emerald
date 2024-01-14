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

// Here the routing via URL links happens
const routes: Routes =[
  {path: 'login', component: LoginComponent },
  {path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route to login
  {path: 'reviewer-panel', component: ReviewerPanelComponent },
  {path: 'project-owner-panel', component: ProjectOwnerPanelComponent},
  {path: 'admin-panel', component: AdminPanelComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent},
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
