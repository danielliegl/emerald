import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPanelRoutes } from './admin-panel.routing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GuidelinesComponent } from '../guidelines/guidelines.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { TableListComponent } from '../table-list/table-list.component';
import { TypographyComponent } from '../typography/typography.component';
import { IconsComponent } from '../icons/icons.component';
import { MapsComponent } from '../maps/maps.component';
import { NotificationsComponent } from '../notifications/notifications.component';
// import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {TestComponent} from "../test/test.component";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";

import { ManageUsersComponent } from 'app/manage-users/manage-users.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminPanelRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    // imported because of standalone = true;
    ManageUsersComponent
  ],
  declarations: [    
    // ManageUsersComponent
  ]
})

export class AdminPanelModule {}
