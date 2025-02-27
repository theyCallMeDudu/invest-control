import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { routes } from 'src/app/app-routing.module';
import { CustomRouteConfig } from '../../interfaces/custom-route-config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuRoutes: CustomRouteConfig[] = [];
  walletId: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Gets walletId from localStorage
    this.walletId = localStorage.getItem('walletId') || '';

    // Filters the routes to include only those that should be displayed in the sidebar menu,
    // using the shouldDisplayRoute function to determine which routes are valid for display.
    this.menuRoutes = routes.filter(route => this.shouldDisplayRoute(route));
  }

  /**
  * Checks whether the route should be displayed in the sidebar.
  *
  * This method filters the routes that should be displayed in the sidebar,
  * excluding routes such as automatic redirects, login routes
  * or any other route that is not relevant to the main navigation.
  *
  * @param route - The route being checked.
  * @returns `true` if the route should be displayed in the sidebar, otherwise `false`.
  */
  private shouldDisplayRoute(route: CustomRouteConfig): boolean {
    return !!route.showInSidebar;  // Only display routes that have 'showInSidebar' set to true
  }

  getRouterLink(route: CustomRouteConfig): string[] {
    if (route.path && route.path.includes('wallet') && this.walletId) {
      // If the route is of Wallet, adds the wallet_id
      return ['/wallet', this.walletId];
    } else {
      // Otherwise, use the route normally
      return [route.path || ''];
    }
  }

  // Checks if the route is active
  isActive(route: CustomRouteConfig): boolean {
    const currentUrl = this.router.url;

    if (route.path?.includes(':')) {

      // If the route has dynamic params, checks if its URL starts with the expected prefix
      const basePath = route.path.split('/:')[0]; // Example: "wallet/:wallet_id" -> "wallet"
      return currentUrl.startsWith(`/${basePath}`);
    }

    return currentUrl.includes(route.path || '');
  }

}
