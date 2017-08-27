import {Routes} from '@angular/router';
import {LoginComponent} from './login';
import {AdminComponent} from './admin';
import {NoContentComponent} from './no-content';
import {DashboardComponent} from './dashboard/dashboard.component';

export const ROUTES: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'admin',  component: AdminComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: '**',    component: NoContentComponent },
];
