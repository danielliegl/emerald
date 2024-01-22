import { Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { TableListComponent } from '../table-list/table-list.component';
import { TypographyComponent } from '../typography/typography.component';
import { IconsComponent } from '../icons/icons.component';
import { MapsComponent } from '../maps/maps.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import {GuidelinesComponent} from "../guidelines/guidelines.component";
import {TestComponent} from "../test/test.component";
import {ReviewerPanelComponent} from "../reviewer-panel/reviewer-panel.component";
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { LogoutButtonComponent } from 'app/logout-button/logout-button.component';
import { LoginComponent } from 'app/login/login.component';

export const AdminPanelRoutes: Routes = [
    { path: 'users',           component: ManageUsersComponent },
    { path: 'logout',          component: LogoutButtonComponent },
    { path: 'login', redirectTo: '/login',           component: LoginComponent }
];
