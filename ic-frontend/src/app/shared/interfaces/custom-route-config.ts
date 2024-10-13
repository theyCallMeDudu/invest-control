import { Route } from '@angular/router';

export interface CustomRouteConfig extends Route {
  showInSidebar?: boolean;  // Optional property to control sidebar visibility
}
