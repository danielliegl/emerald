import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from "./login/login.component";
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ReviewerPanelComponent } from './reviewer-panel/reviewer-panel.component';
import { ProjectOwnerPanelComponent } from './project-owner-panel/project-owner-panel.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { UsersComponent } from './users/users.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    LoginComponent,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LogoutButtonComponent,

    AdminPanelComponent,
    ReviewerPanelComponent,
    ProjectOwnerPanelComponent,
    UserPanelComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
