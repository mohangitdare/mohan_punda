import { Routes } from '@angular/router';

// ui
import { customerComponent } from './customer/customer.component';
import { AgentComponent } from './agents/agents.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTableComponent } from './admin/admin.component';
import { AppSideLoginComponent } from '../authentication/side-login/side-login.component';
import {HomeComponent} from './home/home.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: customerComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'chips',
        component: AgentComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component:  AppTableComponent,
      },
    ],
  },
];
