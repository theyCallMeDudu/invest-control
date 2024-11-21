import { Route } from '@angular/router';

export interface CustomRouteConfig extends Route {
  // Optional properties to control sidebar visibility
  showInSidebar?: boolean;
  menuRouteTitle?: string;
}
