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
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { StudyDetailsComponent } from './study-details/study-details.component';
import { CreateStudyComponent } from './create-study/create-study.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";

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
    CreateStudyComponent,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LogoutButtonComponent,
    AdminPanelComponent,
    ReviewerPanelComponent,
    ProjectOwnerPanelComponent,
    UserPanelComponent,
    ConfirmationDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
