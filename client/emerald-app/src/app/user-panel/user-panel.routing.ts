import { Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { CreateStudyComponent } from 'app/create-study/create-study.component';
import {GuidelinesComponent} from "../guidelines/guidelines.component";
import {TestComponent} from "../test/test.component";
import {ReviewerPanelComponent} from "../reviewer-panel/reviewer-panel.component";
import { LogoutButtonComponent } from 'app/logout-button/logout-button.component';

import { UsersComponent } from '../users/users.component';
import {StudyDetailsComponent} from "../study-details/study-details.component";

export const UserPanelRouting: Routes = [
    { path: 'dashboard',          component: DashboardComponent},
    { path: 'create_study',       component: CreateStudyComponent},
    { path: 'logout',          component: LogoutButtonComponent }
    { path: 'study-details/:id',  component: StudyDetailsComponent},
];
