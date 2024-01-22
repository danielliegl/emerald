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
import { UsersComponent } from '../users/users.component';
import {StudyDetailsComponent} from "../study-details/study-details.component";

export const UserPanelRouting: Routes = [
    { path: 'dashboard',          component: DashboardComponent},
    { path: 'study-details/:id',  component: StudyDetailsComponent},
];
