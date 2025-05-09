

import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
 
  {
    displayName: 'Home',
    iconName: 'home',
    route: '/ui-components/home',
  },
 

    {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Customer',
    iconName: 'user',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Agents',
    iconName: 'users',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Claim Management',
    iconName: 'alert-triangle',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Policy Management',
    iconName: 'shield',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Renewal Management',
    iconName: 'refresh',
    route: '/ui-components/tooltips',
  },
  {
    displayName: 'Customer Support',
    iconName: 'headset',
    route: '/ui-components/forms',
  },
  {
    navCap: 'Admin',
  },
 
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },
];