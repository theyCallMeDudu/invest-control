import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { routes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuRoutes: Route[] = [];

  constructor() { }

  ngOnInit(): void {
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
  private shouldDisplayRoute(route: Route): boolean {
    // Explicitly returns true or false
    return !!(route.path && route.path !== '' && route.path !== 'login');
  }

}